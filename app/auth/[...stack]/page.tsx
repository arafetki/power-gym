
import { StackHandler } from '@stackframe/stack';
import { stackServerApp } from "@/lib/stack-auth/app";

type HandlerProps = {
    params?: {
      stack?: string[]
    }
    searchParams?: Record<string,string>
}

export default function Hanlder({params,searchParams}: HandlerProps) {

  return (
    <StackHandler
      app={stackServerApp}
      params={params}
      searchParams={searchParams}
      fullPage={true}
    />
  );
}