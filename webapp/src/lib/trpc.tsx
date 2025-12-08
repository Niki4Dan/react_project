import type { TrpcRouter } from '@project/backend/src/router' // перед этим выполнить шаги 3
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import Cookies from 'js-cookie'
import superjson from 'superjson'
import { env } from './env.tsx'


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
      url: env.VITE_BACKEND_TRPC_URL, //work
      //url: 'http://192.168.43.254:3000/trpc', // home
      transformer: superjson,
      headers: () => {
        const token = Cookies.get('token')
        return {
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      },
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
