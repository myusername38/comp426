export async function gettwoots(skip, limit) {
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        params: {
            skip,
            limit
        }
    });
    return result.data; 
};

export async function likeTwoot(twootNum) {
    const result = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${ twootNum }/like`,
        withCredentials: true,
      });
      return result
};

export async function unlikeTwoot(twootNum) {
    const result = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${ twootNum }/unlike`,
        withCredentials: true,
      });
      return result
};

export async function twoot(twoot) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          body: twoot
        },
    });
    return result;
};

export async function editTwoot(twoot, id) {
    const result = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${ id }`,
        withCredentials: true,
        data: {
          body: twoot,
        },
      });
    return result
};

export async function deleteTwoot(id) {
    const result = await axios({
        method: 'delete',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${ id }`,
        withCredentials: true,
    });
    return result
};

export async function reTwoot(retwoot, id) {
    const result = await axios({
            method: 'post',
            url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                "type": "retweet",
                "parent": id,
                "body": retwoot,
            },
        });
    return result;
};

export async function getTwootInfo(id) {
    const result = await axios({
        method: 'get',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${ id }`,
        withCredentials: true,
    });
    return result;
};

export async function replyTwoot(reply, id) {
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
          "type": "reply",
          "parent": id,
          "body": reply,
        },
      });
    return result;
};

export const rendertwoots = (twoots) => {
    let result = '';
    twoots.forEach((twoot) => {
        const date = new Date(twoot.createdAt);
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let liked = ''
        if (twoot.isLiked) {
            liked = 'liked';
        }
        let editButton = ''
        if (twoot.isMine) {
            editButton += `<button class="delete-button" id="delete-${ twoot.id }">Delete</button>`
            editButton += `<button class="edit-button" id="edit-${ twoot.id }">Edit</button>`
        }
        let retweetText = '';
        if (twoot.parent) {
            retweetText = `@${ twoot.parent.author } "${twoot.parent.body }"<br><br>`
        }
        let numReplies = 0;
        if (twoot.replyCount) {
            numReplies = twoot.replyCount;
        }
        result += `
        <div class="p-sm w-100 main">
            <div class="tweet">
                <div class="tweet-info">
                    <h2>${ twoot.author }</h2>
                    <h2 class="time">${ date.getHours() }:${ minutes }</h2>
                    ${ editButton }
                </div>
                <div id="twoot-text-${ twoot.id }">
                    <div class="tweet-txt">
                        <p id="body-${ twoot.id }">${ retweetText }${ twoot.body }</p>
                    </div>
                    <div class="buttons">
                        <button id="like-${ twoot.id }" class="button like ${ liked }"><i class="material-icons">star</i></button>
                        <p id="like-number-${ twoot.id }" class="number">${ twoot.likeCount }</p>
                        <button id="retweet-${ twoot.id }" class="button retweet"><i class="material-icons">repeat</i></button>
                        <p class="number">${ twoot.retweetCount }</p>
                        <button id="comment-${ twoot.id }" class="button comment"><i class="material-icons">comment</i></button>
                        <p class="number">${ numReplies }</p>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    return result;
}

export const loadTwoots = (numTwoots) => {
    let twoots = [];
    let numTimes = Math.floor(numTwoots / 50);
    
    for(let i = 0; i < numTimes; i++) {
        let tempTwoots = null;
        const localI = i;
        gettwoots(i * 50, 50).then((result) => {
            tempTwoots = [...result];
        }).then(() => {
            if ( localI == 0) {
                $('#twoots').html(rendertwoots(tempTwoots));
            } else {
                $('#twoots').append(rendertwoots(tempTwoots));
            }
        });
    }
    
}

$(function() {
    let numTwoots = 50;
    loadTwoots(numTwoots);
    $(document).on('click', '.like', function(event) {  
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(5, id.length);
        if (!event.currentTarget.classList.contains('liked')) {
            likeTwoot(trimmedId)
            .then(() => {
                const twoot = document.getElementById(id);
                twoot.classList.add('liked');
                let numLikes = parseInt(document.getElementById(`like-number-${ trimmedId }`).innerHTML);
                document.getElementById(`like-number-${ trimmedId }`).innerHTML = numLikes + 1;
            }).catch((err)=>{
                // console.log(err);
            })
        } else {
            unlikeTwoot(trimmedId)
            .then(() => {
                const twoot = document.getElementById(id);
                twoot.classList.remove('liked');
                let numLikes = parseInt(document.getElementById(`like-number-${ trimmedId }`).innerHTML);
                document.getElementById(`like-number-${ trimmedId }`).innerHTML = numLikes - 1;
            }).catch((err)=> {
                // console.log(err);
            })
        }
    });

    $(document).on('click', '.submit', (event) => {
        event.preventDefault();
        const twootBody = document.getElementById('twoot-editor').value;
        twoot(twootBody)
        .then((result) => {
            // console.log(result);
            document.getElementById('twoot-editor').value = '';
            loadTwoots(numTwoots);
            const $twootBox = $(`#create-twoot-div`);
            $twootBox.html(``);
        }).catch((err) => {
            // console.log(err);
        });  
    });

    $(document).on('click', '.edit-button', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(5, id.length);
        const $tweet = $(`#twoot-text-${ trimmedId }`)
        const prevText =  $(`#body-${ trimmedId }`).text();

        getTwootInfo(trimmedId)
        .then((twoot) => {
            // console.log(twoot);
            $tweet.html(`
            <textarea id="twoot-editor-${ trimmedId }" class="editor" cols="50">${ twoot.data.body }</textarea>
            <div class="buttons">
                <button id="append-${ trimmedId }" class="twoot-button append">Append Twoot</button>
                <button id="cancel-${ trimmedId }" class="twoot-button cancel">Cancel</button>
            </div>
        `);
        })
    });

    $(document).on('click', '.retweet', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(8, id.length);
        const $tweet = $(`#twoot-text-${ trimmedId }`)
        const prevText =  $(`#body-${ trimmedId }`).text();
        $tweet.html(`
            <div class="tweet-txt">
                <p id="body-${ trimmedId }">${ prevText }</p>
            </div>
            <textarea id="retwoot-editor-${ trimmedId }" class="editor" cols="50"></textarea>
            <div class="buttons">
                <button id="cancel-${ trimmedId }" class="twoot-button cancel">Cancel</button>
                <button id="confirm-retweet-${ trimmedId }" class="twoot-button confirm-retweet">Retwoot</button>
            </div>
        `);
    });

    $(document).on('click', '.confirm-retweet', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(16, id.length);
        const retwootBody = document.getElementById(`retwoot-editor-${ trimmedId }`).value;
        // console.log(trimmedId);
        // console.log(retwootBody);
        let body = ' '
        if (retwootBody) {
            body = retwootBody;
        }
        reTwoot(body, trimmedId).then(() => {
            setTimeout(function(){ loadTwoots(numTwoots) }, 1000);
        }).catch((err) => {
            // console.log(err);
        });
    });

    $(document).on('click', '.comment', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(8, id.length);
        const $tweet = $(`#twoot-text-${ trimmedId }`)
        const prevText =  $(`#body-${ trimmedId }`).text();
        let replies = '';
        getTwootInfo(trimmedId)
        .then((info) => {
            if (info.data.replies) {
                replies += `
                    <div class="comment-header">
                        <h2>Replies</h2>
                    </div>
                `
                info.data.replies.forEach(r => {
                    const date = new Date(r.createdAt);
                    let minutes = date.getMinutes();
                    if (minutes < 10) {
                        minutes = '0' + minutes;
                    }
                    replies += `
                    <div class="comment-info">
                        <h2>${ r.author }</h2>
                        <h2 class="time">${ date.getHours() }:${ minutes }</h2>
                    </div>
                    <div class="tweet-txt">
                        <p id="body-${ r.id }">${ r.body }</p>
                    </div>
                    `
                });
            }
        })
        .then(() => {
            $tweet.html(`
                <div class="tweet-txt">
                    <p id="body-${ trimmedId }">${ prevText }</p>
                </div>
                ${ replies }
                <div class="comment-header mb-sm">
                    <h2>Write a reply</h2>
                </div>
                <textarea id="comment-editor-${ trimmedId }" class="editor" cols="50"></textarea>
                <div class="buttons">
                    <button id="cancel-${ trimmedId }" class="twoot-button cancel">Cancel</button>
                    <button id="confirm-comment-${ trimmedId }" class="twoot-button confirm-comment">Reply</button>
                </div>

            `);
        });
    });

    $(document).on('click', '.confirm-comment', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(16, id.length);
        const retwootBody = document.getElementById(`comment-editor-${ trimmedId }`).value;
        replyTwoot(retwootBody, trimmedId)
        .then(() => {
            setTimeout(function(){ loadTwoots(numTwoots) }, 1000);
        }).catch((err) => {
            // console.log(err);
        });
    });

    $(document).on('click', '.cancel', (event) => {
        event.preventDefault();
        loadTwoots(numTwoots);
        const $twootBox = $(`#create-twoot-div`);
        $twootBox.html(``);
    });

    $(document).on('click', '.append', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(7, id.length);
        const twootBody = document.getElementById(`twoot-editor-${ trimmedId }`).value;
        editTwoot(twootBody, trimmedId).then(() => {
            loadTwoots(numTwoots);
        }).catch((err) => {
            // console.log(err);
        });
    });

    $(document).on('click', '.delete-button', (event) => {
        event.preventDefault();
        let id = event.currentTarget.id;
        const trimmedId = id.substring(7, id.length);
        deleteTwoot(trimmedId).then(() => {
            setTimeout(function(){ loadTwoots(numTwoots) }, 1000);
        }).catch((err) => {
            // console.log(err);
        });
    });

    $(document).on('click', '.twoot-now', (event) => {
        event.preventDefault();
        window.scrollTo(0, 0); 
        const $twootBox = $(`#create-twoot-div`);
        $twootBox.html(`
            <div class="tweet-info">
                <h2>What's up?</h2>
            </div>
            <textarea id="twoot-editor" class="editor" cols="50"></textarea>
            <div class="buttons">
                <button class="twoot-button cancel">Cancel</button>
                <button class="twoot-button submit">Twoot</button>
            </div>
        `);
    });

    $(window).scroll(() => {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            numTwoots += 50;
            gettwoots((numTwoots - 50), 50).then((result) => {
                $('#twoots').append(rendertwoots([...result]));
            });
        }
     });
});
