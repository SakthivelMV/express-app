pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS_18', type: 'NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/SakthivelMV/express-app', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'

                // Retry PM2 install to handle transient failures
                retry(2) {
                    sh 'npm install -g pm2 || true'
                }
            }
        }

        stage('Clean Port') {
            steps {
                // Optional: kill any process on port 3000
                sh '''
                    PORT=3000
                    PID=$(lsof -ti tcp:$PORT)
                    if [ ! -z "$PID" ]; then
                      kill -9 $PID || true
                    fi
                '''
            }
        }

        stage('Restart Application') {
            steps {
                sh '''
                    pm2 delete all || true
                    pm2 start index.js --name express-app
                    pm2 save
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:3000/health || exit 1
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check logs above for details.'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
    }
}
