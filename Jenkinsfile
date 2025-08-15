pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/SakthivelMV/express-app', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        node -v && npm -v
                        npm config set engine-strict false
                        npm install
                    '''
                }
            }
        }

        stage('Clean Port') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        PORT=3000
                        PID=$(lsof -ti tcp:$PORT)
                        if [ ! -z "$PID" ]; then
                          kill -9 $PID || true
                        fi
                    '''
                }
            }
        }

        stage('Restart Application') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        npx pm2 delete all || true
                        npx pm2 start server.js --name express-app
                        npx pm2 save
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh '''
                        sleep 5
                        curl -f http://localhost:3000/health || exit 1
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully.'
        }
        unstable {
            echo '⚠️ Pipeline completed with warnings. Check stage logs.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above for details.'
        }
    }
}
