const constantValidationFlag = true
const valNum = 80

const config = {
  "check-coverage": true,
  "lines": 75,
  "functions": 75,
  "branches": 75,
  "statements": 75,
  "all": true,
  "exclude": "./js"
}

const metricValKeys = ['lines', 'functions', 'branches', 'statements']

if ( constantValidationFlag ) {
  metricValKeys.forEach((key) => {
    config[key] = valNum
  })
}

process.stdout.write(JSON.stringify(config))