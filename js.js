$(function() {

    $.ajax({
        url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${config.API_KEY}`,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
          let bookData = dataSanitizer(res);
          bookData.forEach((data)=>{
            const itemDiv = $("<div></div>").attr("id",data.rank);
            const rank = $('<h2 class="rank"></h2>').text(data.rank);
            itemDiv.append(rank)
            const img = $('<img class="bookimg">').attr("src", data.image);
            itemDiv.append(img)
            const title = $('<h3 class="booktitle"></h3>').text(data.title);
            itemDiv.append(title)
            const primary = $('<p class="primary"></p>').text(data.primary );
            itemDiv.append(primary )
            const desc = $('<p class="desc"></p>').text(data.desc);
            itemDiv.append(desc)
            $(".list").append(itemDiv);
          })
          let listData = dataSanitizer2(res);
          listData.forEach((data2)=>{
            const listDiv = [];
                const list_name = data2.list_name;
                listDiv.push("THE BEST SELLER ",list_name)
                const published_date = data2.published_date;
                listDiv.push("Published in ",published_date)
                $(".title").append(listDiv);
            console.log(listData)
        })

        },
        error: function(xhr) {
         console.log(`${request.status} : ${request.error}`);
        }

     })
    })

    function dataSanitizer(response){
        let data = [];
        console.log(data)
        response.results.books.forEach((d)=>{
            data.push({
                rank:(typeof d.rank === 'undefined') ? "-" : d.rank,
                title:(typeof d.title === 'undefined') ? "-" :d.title,
                image:d.book_image,
                primary : (typeof d.primary_isbn13=== 'undefined') ? "-" : d.primary_isbn13,
                author : (typeof d.author === 'undefined') ? "-" : d.author,
                desc: (typeof d.description === 'undefined') ? "-" : d.description,

            })
        })
        data.push({
            list_name: response.results.list_name,
            published_date : response.results.published_date
        })

        return data;
    }

    function dataSanitizer2(response){
        let data2 = [];
        data2.push({
            list_name: response.results.list_name,
            published_date : response.results.published_date
        })

        return data2;
    }
