import type { TrpcRouter } from '@project/backend/src/router' // перед этим выполнить шаги 3
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<TrpcRouter>() // тип TrpcRouter в бэкэнде

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // не перезапрашивать, если ошибка
      refetchOnWindowFocus: false, // перезапрос данных при уходе с окна // во время разработки выкл
    },
  },
})

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://192.168.38.147:3000/trpc', //work
      //url: 'http://192.168.43.254:3000/trpc', // home
    }),
  ],
})

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
