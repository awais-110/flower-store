import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { MedusaError, Modules } from "@medusajs/framework/utils"
import type { AuthenticationInput } from "@medusajs/framework/types"

type UpdateCustomerPasswordStepInput = {
  entity_id: string
  old_password: string
  new_password: string
}

export const updateCustomerPasswordStep = createStep(
  "update-customer-password",
  async (input: UpdateCustomerPasswordStepInput, { container }) => {
    const authService = container.resolve(Modules.AUTH)

    const verification = await authService.authenticate(
      "emailpass",
      {
        body: { email: input.entity_id, password: input.old_password },
      } as AuthenticationInput
    )

    if (!verification.success) {
      throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "Old password is incorrect")
    }

    const update = await authService.updateProvider("emailpass", {
      password: input.new_password,
      entity_id: input.entity_id,
    })

    if (!update.success) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        update.error ?? "Unable to update password"
      )
    }

    return new StepResponse({ success: true })
  }
)