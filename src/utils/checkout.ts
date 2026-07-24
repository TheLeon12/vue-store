import type { CheckoutErrors, CheckoutForm } from '@/types/checkout'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PHONE_PATTERN = /^[0-9+\-()\s]{7,20}$/

const POSTAL_CODE_PATTERN = /^[A-Za-z0-9\- ]{3,12}$/

const CARD_NUMBER_PATTERN = /^\d{16}$/

const CARD_EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/

const CARD_CVC_PATTERN = /^\d{3,4}$/

export function normalizeCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16)
}

export function formatCardNumber(value: string): string {
  return normalizeCardNumber(value).replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function normalizeCardExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function normalizeCardCvc(value: string): string {
  return value.replace(/\D/g, '').slice(0, 4)
}

export function validateCheckoutForm(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {}

  if (!form.firstName.trim()) {
    errors.firstName = 'El nombre es obligatorio.'
  } else if (form.firstName.trim().length < 2) {
    errors.firstName = 'El nombre debe tener al menos 2 caracteres.'
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'El apellido es obligatorio.'
  } else if (form.lastName.trim().length < 2) {
    errors.lastName = 'El apellido debe tener al menos 2 caracteres.'
  }

  if (!form.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.'
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Introduce un correo electrónico válido.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio.'
  } else if (!PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = 'Introduce un número de teléfono válido.'
  }

  if (!form.address.trim()) {
    errors.address = 'La dirección es obligatoria.'
  } else if (form.address.trim().length < 5) {
    errors.address = 'Introduce una dirección más completa.'
  }

  if (!form.city.trim()) {
    errors.city = 'La ciudad es obligatoria.'
  }

  if (!form.province.trim()) {
    errors.province = 'La provincia o estado es obligatorio.'
  }

  if (!form.postalCode.trim()) {
    errors.postalCode = 'El código postal es obligatorio.'
  } else if (!POSTAL_CODE_PATTERN.test(form.postalCode.trim())) {
    errors.postalCode = 'Introduce un código postal válido.'
  }

  if (!form.country.trim()) {
    errors.country = 'El país es obligatorio.'
  }

  if (form.paymentMethod === 'card') {
    if (!form.cardholderName.trim()) {
      errors.cardholderName = 'El nombre del titular es obligatorio.'
    }

    const cardNumber = normalizeCardNumber(form.cardNumber)

    if (!cardNumber) {
      errors.cardNumber = 'El número de tarjeta es obligatorio.'
    } else if (!CARD_NUMBER_PATTERN.test(cardNumber)) {
      errors.cardNumber = 'La tarjeta debe contener 16 dígitos.'
    }

    if (!form.cardExpiry.trim()) {
      errors.cardExpiry = 'La fecha de vencimiento es obligatoria.'
    } else if (!CARD_EXPIRY_PATTERN.test(form.cardExpiry)) {
      errors.cardExpiry = 'Utiliza el formato MM/AA.'
    }

    if (!form.cardCvc.trim()) {
      errors.cardCvc = 'El código de seguridad es obligatorio.'
    } else if (!CARD_CVC_PATTERN.test(form.cardCvc)) {
      errors.cardCvc = 'El código debe contener 3 o 4 dígitos.'
    }
  }

  if (!form.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los términos para continuar.'
  }

  return errors
}

export function hasCheckoutErrors(errors: CheckoutErrors): boolean {
  return Object.keys(errors).length > 0
}

export function buildShippingAddress(form: CheckoutForm): string {
  return [
    form.address.trim(),
    form.city.trim(),
    form.province.trim(),
    form.postalCode.trim(),
    form.country.trim(),
  ]
    .filter(Boolean)
    .join(', ')
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()

  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase()

  return `ORD-${timestamp}-${randomPart}`
}
