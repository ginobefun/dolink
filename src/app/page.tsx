'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [destination, setDestination] = useState('');
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('dol.ink'); // 默认域名
  const [backHalf, setBackHalf] = useState('');

  const handleCreateShortLink = async (e: any) => {
    e.preventDefault();
    // TODO: 在这里处理表单提交事件，如发送到 API
    console.log(destination, title, domain, backHalf);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6">Create new</h1>
      <form onSubmit={handleCreateShortLink}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="destination">
            Destination
          </label>
          <Input id="destination" placeholder="https://example.com/my-long-url" type="url" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title (optional)
          </label>
          <Input id="title" placeholder="" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <hr className="mb-6" />
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">Ways to share</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="domain">
                Domain
              </label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger id="domain">
                  <SelectValue placeholder="dol.ink" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="dol.ink">dol.ink</SelectItem>
                  <SelectItem value="f2rcc">f2r.cc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="back-half">
                Custom back-half (optional)
              </label>
              <Input id="back-half" placeholder="/" type="text" value={backHalf} onChange={(e) => setBackHalf(e.target.value)} />
            </div>
          </div>

        </div>
        <Button type="submit" className="mt-4">Create Short Link</Button>
      </form>
    </div>
  )
}

