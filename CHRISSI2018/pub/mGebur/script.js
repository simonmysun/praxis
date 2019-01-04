var client = new ApiAi.ApiAiClient({accessToken: '8c44ac04d5444b2f82ef118ce9c7f2cd'});

var sendText = function(text) {
    return client.textRequest(text);
};

function submiting() {
    if(document.getElementById('message').value === '') {
        return false;
    }
    document.getElementById('response').innerHTML += `<div class="bot-request">You: ${document.getElementById('message').value}</div>`;
    document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
    sendText(document.getElementById('message').value)
        .then(function(response) {
            var result;
            try {
                result = response.result.fulfillment.speech;
                if(response.result.action.startsWith('transfer')) {
                    result = 'Transfering via smart assistant by user is forbidden. Please use the form instead. ';
                    client = new ApiAi.ApiAiClient({accessToken: '8c44ac04d5444b2f82ef118ce9c7f2cd'});
                }
            } catch(error) {
                result = '';
            }
            console.log(response);
            document.getElementById('response').innerHTML += `<div class="bot-response">${result}</div>`;
            document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
        })
        .catch(function(err) {
            console.log(err);
            document.getElementById('response').innerHTML += `<div>Something goes wrong. </div>`;
            document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
        });
    document.getElementById('message').value = '';
    return false;
};

var snd = function(tmpclient, arr) {
    if(arr.length > 0) {
        var txt = arr.shift();
        console.log(txt);
        document.getElementById('response').innerHTML += `<div class="bot-request">Clerk: ${txt}</div>`;
        document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
        client.textRequest(txt)
            .then(function(response) {
                var result;
                try {
                    result = response.result.fulfillment.speech;
                } catch(error) {
                    result = '';
                }
                console.log(response);
                document.getElementById('response').innerHTML += `<div class="bot-response">${result}</div>`;
                document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
                if(response.result.action === 'transfer.money.yes') {
                    ctx = response.result.contexts.filter(x => x.name === 'transfer')[0].parameters;
                    console.log(ctx['account-from.original'], ctx['account-to.original']);
                    if(ctx['account-from.original'] === 'maomao account') {
                        document.getElementById('response').innerHTML += `<div class="bot-response">FLAG{39cabd}</div>`;
                        document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
                    }
                }
                setTimeout(function() {
                    snd(tmpclient, arr);
                }, 300);
            })
            .catch(function(err) {
                console.log(err);
                document.getElementById('response').innerHTML += `<div>Something goes wrong. </div>`;;
                document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
            });
    } else {
        client = new ApiAi.ApiAiClient({accessToken: '8c44ac04d5444b2f82ef118ce9c7f2cd'});
    }
}

function transfersubmiting() {
    var tmpclient = new ApiAi.ApiAiClient({accessToken: '8c44ac04d5444b2f82ef118ce9c7f2cd'});

    if(document.getElementById('transfer-from').value === 'maomao account') {
        alert('Clerk: You cannot transfer from maomao account! ');
    } else if(document.getElementById('transfer-from').value === document.getElementById('transfer-to').value) {
        alert('Clerk: Transfer source and origin cannot be same! ');
    } else if(document.getElementById('transfer-amount').value === '') {
        alert('Clerk: Please input transfer amount! ');
    } else {
        var textToSend = `Can you make a money transfer.From ${document.getElementById('transfer-from').value}.To ${document.getElementById('transfer-to').value}.${document.getElementById('transfer-amount').value} dollars.Yes.Thank you`;
        textToSend = textToSend.split('.');
        snd(tmpclient, textToSend);
    }
    return false;
}

document.getElementById('response').innerHTML += `<div class="bot-response">Hello! This is ACME Bank. How can I help you?</div>`;
document.getElementById("response").scrollTop = document.getElementById("response").scrollHeight;
