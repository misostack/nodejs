import { EnvironmentService } from './index'

// push to slack or send email to admin later

class LogService {
	static logError(){

	}

	static logDebug(){

	}

	static log(message, type) {
		if(type == 'error'){
			console.error(`[ERROR]:${message}`)
		}else{
			if(EnvironmentService.get('DEBUG') === true){
				console.error(`[DEBUG]:${message}`)
			}
		}
	}
}

export default LogService