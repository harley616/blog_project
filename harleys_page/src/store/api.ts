const call = async (method: string, url: string, params?: {}): Promise<any> => {
	const fullUrl = 'http://localhost:3000' + url
	const response = await fetch(fullUrl, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		},
		body: JSON.stringify(params),
	})
	return await response.json()
}

export default call
