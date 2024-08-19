import { migrate } from 'drizzle-orm/libsql/migrator'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

async function main() {
  const db = drizzle(createClient({ url: 'libsql://quiz-builder-renn.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQwMzMxMjksImlkIjoiZWIwMjg2MWYtNDlhNy00YjRhLWIyNzgtZTNmNDM5MzcyM2Q1In0.LuKT92YwQdLw2Ok8Z2nigit4vBm6Yzq07Z_q0QywosbMMq_wC-8AJwf8x68vZWJFQUeb1PaBssAQlNv_p_YbAQ' }))

  console.log('Running migrations')

  await migrate(db, { migrationsFolder: 'drizzle' })

  console.log('Migrated successfully')

  process.exit(0)
}

main().catch((e) => {
  console.error('Migration failed')
  console.error(e)
  process.exit(1)
})
