/** Учётные данные входа в админку (клиентская проверка для MVP). */
export const ADMIN_CREDENTIALS = {
  /** Основной логин */
  login: 'admin@aduard.com',
  /** Допустимые варианты логина (на случай автозаполнения старого значения) */
  loginAliases: ['admin@aduard.com', 'admin'] as const,
  password: 'forma2024',
} as const

export function normalizeAdminLogin(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

export function isValidAdminLogin(login: string): boolean {
  const normalized = normalizeAdminLogin(login)
  return ADMIN_CREDENTIALS.loginAliases.some((alias) => alias === normalized)
}

export function isValidAdminPassword(password: string): boolean {
  return password.trim() === ADMIN_CREDENTIALS.password
}
