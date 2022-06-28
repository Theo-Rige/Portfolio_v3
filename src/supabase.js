import { createClient } from '@supabase/supabase-js'

const url = 'https://zqhzeqframxwrjjwqlpe.supabase.co'

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzI3MjM2OCwiZXhwIjoxOTQ4ODQ4MzY4fQ.-y8NYVGOw93BYkfmp9FxJ96v83uCopjvJy8iiS3jr7g'

export const supabase = createClient(url, key)
