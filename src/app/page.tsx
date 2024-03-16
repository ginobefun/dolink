import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLink } from '@/lib/action';

export default function Component() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-md shadow-md dark:shadow-xl border border-gray-300">
        <h1 className="text-2xl font-bold mb-6">Create new</h1>
        <form action={createLink} className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="destination">
              Destination
            </label>
            <Input id="destination" name="destination" placeholder="https://example.com/my-long-url" type="url" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title (optional)
            </label>
            <Input id="title" name="title" placeholder="" type="text" />
          </div>
          <div className="mb-4 grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1" htmlFor="domain">
                Domain
              </label>
              <Input id="domain" type="text" disabled value="dol.ink/" readOnly />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium mb-1" htmlFor="backHalf">
                Custom back-half (optional)
              </label>
              <Input id="backHalf" name="backHalf" placeholder="abc" type="text" />
            </div>
          </div>
          <Button type="submit" className="mt-4">Create Short Link</Button>
        </form>
      </div>
    </div>
  )
}
