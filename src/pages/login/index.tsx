import { login } from "@/api/login"
import { Form } from "@/components/Form"
import { LoaderSpin } from "@/components/Loaders/Spin"
import { State } from "@/components/State"
import { authorizeUser, logout } from "@/hooks/auth"
import { useRestState } from "@/hooks/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { Tag } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export function LoginPage() {

  const state = useRestState()

  const redirect = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {

    logout()

  }, [])

  return (
    <div className="w-screen h-svh flex justify-center items-center">
      <div className="flex flex-col gap-5 item container md:max-w-sm">
        <div className="flex gap-1 items-end mb-5">
          <Tag className="size-8" /> <span className="text-4xl font-semibold"><span className="text-primary">IA</span>tag</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-semibold">
            Login
          </h2>
          <p className="text-foreground/80">
            Bem vindo ao login da IAtag
          </p>
        </div>
        <Form
          {...form}
          onSubmit={async (formData) => {

            state.loading()

            const { ok, data } = await login(formData)

            if (!ok) return state.error()

            state.success()

            authorizeUser(data.response)
            redirect('/')
            toast.success('Login realizado')

          }}
        >
          <Form.Row>
            <Form.Input className="flex-1 bg-card" name="email">
              Email
            </Form.Input>
          </Form.Row>
          <Form.Row>
            <Form.Password className="flex-1 bg-card" name="password">
              Senha
            </Form.Password>
          </Form.Row>
          <Form.Footer>
            <Form.BtnSubmit className="flex-1" disabled={state.current != 'default'}>
              <State value={state.current}>
                <State.Default>
                  Logar
                </State.Default>
                <State.Loading>
                  Logando <LoaderSpin />
                </State.Loading>
                <State.Success>
                  Logado
                </State.Success>
                <State.Error>
                  Erro
                </State.Error>
              </State>
            </Form.BtnSubmit>
          </Form.Footer>
        </Form>
      </div>
    </div>
  )

}