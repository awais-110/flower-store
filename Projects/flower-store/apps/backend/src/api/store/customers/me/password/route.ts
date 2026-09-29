import { MedusaStoreRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError, Modules } from "@medusajs/framework/utils"
import { updateCustomerPasswordWorkflow } from "../../../../../workflows/update-customer-password"

export async function POST(req: MedusaStoreRequest, res: MedusaResponse) {
  const actorId = req.auth_context?.actor_id as string | undefined

  if (!actorId) {
    throw new MedusaError(
      MedusaError.Types.UNAUTHORIZED,
      "You must be logged in to change your password"
    )
  }

  const { old_password, new_password } = (req.body ?? {}) as {
    old_password?: string
    new_password?: string
  }

  if (!old_password || !new_password) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "old_password and new_password are required"
    )
  }

  const customerService = req.scope.resolve(Modules.CUSTOMER)
  const customer = await customerService.retrieveCustomer(actorId, {
    select: ["email"],
  })

  await updateCustomerPasswordWorkflow(req.scope).run({
    input: {
      entity_id: customer.email,
      old_password,
      new_password,
    },
  })

  res.status(200).json({ success: true })
}