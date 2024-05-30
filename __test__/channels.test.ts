import { expect, test, describe } from 'vitest'
import { parseLocalUrl } from './utils/parseLocalUrl'

describe('Channels test', () => {
    test('Get channels', async () => {
        const res = await fetch(parseLocalUrl('/channels'))
        expect(res.status).toBe(200)
    })

    test('Add channel', async () => {
        const res = await fetch(parseLocalUrl('/channels/add?channel=akozl'), {
            method: 'POST',
        })

        expect(res.status).toBe(200)

        const channels = await fetch(parseLocalUrl('/channels'))
        const parsedValue = await channels.json()

        expect(parsedValue.find((c: { username: string }) => c.username === 'akozl')).toBeDefined()
    })

    test('is listening channel', async () => {
        const res = await fetch(parseLocalUrl('/channels/listening?channel=akozl'))
        expect(res.status).toBe(200)

        const parsedValue = await res.json()

        expect(parsedValue.success).toBeTypeOf('boolean')
    })
})