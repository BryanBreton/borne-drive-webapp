#!groovy
 
@Library('gie@develop') _
 
continuousIntegration(
  authProvider: 'none',
    builder: 'npm',
    deployer: 'apache_mutualise',
    slackChannel: '{{id-project}}-stream',
    alias: '{{id-project}}',
    allowManualDeployment: true,
    apacheMutualiseDeployer: [
        int1: [
            host       : 'u3antu332',
            port       : '80',
            confenv    : 'confenv.properties',
            confapp    : 'confapp.properties',
        ],
        rec1: [:],
        prod: [:]
    ],
    smokeTestRunner: [
		// rec1:   [
		// 	testRunner: 'cypress',
		// 	parameters: [
        //         smUserProfile : 'Centrale',
        //         smCentrale    : "Centrale Nationale",
        //         credentials   : "CREDENTIALS", // TODO
        //         smAppUrl      : 'URL_PROJET_RECETTE' // TODO
		// 	]
		// ],
        // prod:  [
		// 	testRunner: 'cypress',
		// 	parameters: [
        //         smUserProfile : 'Centrale',
        //         smCentrale    : "Centrale Nationale",
        //         credentials   : "CREDENTIALS", // TODO
        //         smAppUrl      : 'URL_PROJET_PROD' // TODO
		// 	]
		// ]
	]
)
