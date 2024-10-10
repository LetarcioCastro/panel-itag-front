import { Form } from "@/components/Form";

export function TagFormFields() {

  return (
    <>
      <Form.Row>
        <Form.Input name="alias">
          Nome
        </Form.Input>
      </Form.Row>
      <Form.Row>
        <Form.Input name="code">
          SN do dispositivo
        </Form.Input>
      </Form.Row>
      <Form.Row>
        <Form.Switch name="is_active">
          Status ativo
        </Form.Switch>
      </Form.Row>
    </>
  )

}