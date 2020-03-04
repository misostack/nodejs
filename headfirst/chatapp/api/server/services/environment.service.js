class EnvironmentService {
	static get(key) {
		return process.env[key]
	}
}

export default EnvironmentService