"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SubnetCalculatorPage() {
  const [ipAddress, setIpAddress] = useState('192.168.1.1');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    try {
      const ipParts = ipAddress.split('.').map(Number);
      const maskParts = subnetMask.split('.').map(Number);

      if (ipParts.length !== 4 || maskParts.length !== 4) {
        setResult({ error: 'Invalid IP address or subnet mask format' });
        return;
      }

      // Calculate network address
      const networkParts = ipParts.map((ip, i) => ip & maskParts[i]);
      const networkAddress = networkParts.join('.');

      // Calculate broadcast address
      const wildcardParts = maskParts.map(m => 255 - m);
      const broadcastParts = networkParts.map((net, i) => net | wildcardParts[i]);
      const broadcastAddress = broadcastParts.join('.');

      // Calculate first and last usable host
      const firstHost = [...networkParts];
      firstHost[3] += 1;
      const lastHost = [...broadcastParts];
      lastHost[3] -= 1;

      // Calculate CIDR notation
      const cidr = maskParts.reduce((count, octet) => {
        return count + octet.toString(2).split('1').length - 1;
      }, 0);

      // Calculate number of hosts
      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = totalHosts - 2;

      // IP class
      let ipClass = 'Unknown';
      const firstOctet = ipParts[0];
      if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'A';
      else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B';
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C';
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D (Multicast)';
      else if (firstOctet >= 240 && firstOctet <= 255) ipClass = 'E (Reserved)';

      // Private IP check
      const isPrivate = 
        (ipParts[0] === 10) ||
        (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
        (ipParts[0] === 192 && ipParts[1] === 168);

      setResult({
        ipAddress,
        networkAddress,
        broadcastAddress,
        firstHost: firstHost.join('.'),
        lastHost: lastHost.join('.'),
        cidr,
        subnetMask,
        wildcardMask: wildcardParts.join('.'),
        totalHosts,
        usableHosts,
        ipClass,
        isPrivate: isPrivate ? 'Yes' : 'No'
      });
    } catch (error) {
      setResult({ error: 'Error calculating subnet information' });
    }
  };

  return (
    <CalculatorLayout title="IP Subnet Calculator" description="Calculate subnet information for IPv4 addresses.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">IP Address</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="192.168.1.1"
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Subnet Mask</label>
          <input
            type="text"
            value={subnetMask}
            onChange={(e) => setSubnetMask(e.target.value)}
            placeholder="255.255.255.0"
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : (
              <div className="space-y-2">
                <p><strong>IP Address:</strong> {result.ipAddress}</p>
                <p><strong>Network Address:</strong> {result.networkAddress}/{result.cidr}</p>
                <p><strong>Subnet Mask:</strong> {result.subnetMask}</p>
                <p><strong>Wildcard Mask:</strong> {result.wildcardMask}</p>
                <p><strong>Broadcast Address:</strong> {result.broadcastAddress}</p>
                <p><strong>First Usable Host:</strong> {result.firstHost}</p>
                <p><strong>Last Usable Host:</strong> {result.lastHost}</p>
                <p><strong>Total Hosts:</strong> {result.totalHosts}</p>
                <p><strong>Usable Hosts:</strong> {result.usableHosts}</p>
                <p><strong>IP Class:</strong> {result.ipClass}</p>
                <p><strong>Private IP:</strong> {result.isPrivate}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
