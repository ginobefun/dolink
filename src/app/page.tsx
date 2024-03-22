'use client'

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { domain } from "@/lib/constant";

export default function Component() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [title, setTitle] = useState('');
  const [backHalf, setBackHalf] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const url = new URL(domain);
  const prefix = url.hostname;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError('');

    try {
      const response = await fetch('/api/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, title, backHalf: backHalf ? backHalf.trim() : '' }),
      });

      const result = await response.json();
      console.log('create link result', result);
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
        }
        throw new Error(result.message || 'An error occurred');
      } else {
        // Maybe reset form here or set a success state
        router.push(`/link/${result.backHalf}`);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md dark:shadow-xl border border-gray-300">
        <h1 className="text-2xl font-bold mb-6">Create new</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="destination" className="block text-sm font-medium mb-1">
              Destination
            </label>
            <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="https://example.com/my-long-url" type="url" required />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title (optional)
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="" type="text" />
          </div>
          <div className="mb-4 grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label htmlFor="domain" className="block text-sm font-medium mb-1">
                Domain
              </label>
              <Input id="domain" type="text" disabled value={prefix + "/"} readOnly />
            </div>
            <div className="col-span-3">
              <label htmlFor="backHalf" className="block text-sm font-medium mb-1">
                Custom back-half (optional)
              </label>
              <Input id="backHalf" value={backHalf} onChange={(e) => setBackHalf(e.target.value)} placeholder="abcd" type="text" />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button type="submit" disabled={isPending} className="mt-4">
            {isPending ? 'Creating...' : 'Create Short Link'}
          </Button>
        </form>
      </div>
    </div>
  );
}
