const BCYCLE_INFORMATION_ENDPOINT = 'https://gbfs.bcycle.com/bcycle_santacruz/station_information.json'
const BCYCLE_STATUS_ENDPOINT = 'https://gbfs.bcycle.com/bcycle_santacruz/station_status.json'

export async function getBcycleStatusJSON(): Promise<any> {
    const response = await fetch(BCYCLE_STATUS_ENDPOINT);
    const data = await response.json(); // Directly parse as JSON
    return data;
}

export async function getBcycleInformationJSON(): Promise<any> {
    const response = await fetch(BCYCLE_INFORMATION_ENDPOINT);
    const data = await response.json(); // Directly parse as JSON
    return data;
}