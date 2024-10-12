
const BCYCLE_INFORMATION_ENDPOINT = 'https://gbfs.bcycle.com/bcycle_santacruz/station_information.json'
const BCYCLE_STATUS_ENDPOINT = 'https://gbfs.bcycle.com/bcycle_santacruz/station_status.json'

export async function getBcycleStatusJSON(): Promise<string> {
    const data = await fetch(BCYCLE_STATUS_ENDPOINT)
    return data.text()
}

export async function getBcycleInformationJSON(): Promise<string> {
    const data = await fetch(BCYCLE_INFORMATION_ENDPOINT)
    return data.text()
}

