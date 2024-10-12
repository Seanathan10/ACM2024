const BCYCLE_INFORMATION_ENDPOINT = 'https://gbfs.bcycle.com/bcycle_santacruz/station_information.json'
const BCYCLE_STATUS_ENDPOINT = 'https://gbfs.bcycle.com/bcycle_santacruz/station_status.json'

export async function getBcycleStatusJSON(): Promise<object> {
    const data = await fetch(BCYCLE_STATUS_ENDPOINT)
    return JSON.parse(await data.text())
}

export async function getBcycleInformationJSON(): Promise<object> {
    const data = await fetch(BCYCLE_INFORMATION_ENDPOINT)
    return JSON.parse(await data.text())
}