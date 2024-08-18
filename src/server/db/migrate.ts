import { migrate } from 'drizzle-orm/libsql/migrator'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

async function main() {
  const db = drizzle(createClient({ url: 'libsql://power-leader-renn.turso.io', authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY2MTg1NjUsImlkIjoiZTMyNTc1MWItYjZjZS00ZjI4LWFlMGUtZGVkMGU3ODc4ODdmIn0.6MbjcNozeaIbgvqRmem8DswA66Y0EcAqhrqQsinIrgFCMJWBT6m_5P3Kd6LpltMdNg5_JvpeC6a8I_cQFEM5Aw' }))

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
