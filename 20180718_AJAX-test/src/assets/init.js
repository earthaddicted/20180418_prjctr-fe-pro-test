console.log('init')


fetch('http://www.mocky.io/v2/5b4f74e73600005000dd0b2c')
    .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        } else {
            var error = new Error(response.statusText)
            throw error
        }
    }).then(function(data){
        console.log(data)
    }).catch(function(error){
        console.log(error)
    })