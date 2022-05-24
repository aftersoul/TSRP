(function() {
    let uid= Number(jq("input[name='cuId']")[0].value)
    let tid = Number(window.location.href.match(/tid=(\d+)/)[1])
    let url="https://tsdmredpacket.deta.dev/gettsb"
    let t=jq(".pct").eq(0)
    t.append('<div id="ts_packet" class="showhide"><img class="tsrp" src="static/image/post/rp-1.svg"></div>')
    jq("#ts_packet").css({"text-align":"center","background-color":"rgba(255,255,255,0.5)"})
    jq("#ts_packet img").css("width","300px")
    jq(".tsrp").bind("click",()=>{
        jq(".tsrp").unbind("click")
        showDialog("红包提取中", 'notice')
        jq.ajax({
            type:"post",
            url:url,
            data:JSON.stringify({"uid":uid,"tid":tid}),
            contentType:"application/json;charset=utf-8",
            dataType:"json",
            success:function(data){
                if(data.status<0){
                    showDialog(data.msg,"alert");
                    if(data.msg.search("已领取")>=0){
                        jq("#ts_packet img")[0].src="/static/image/post/rp-2.svg"
                    }
                }
                else if(!data.status){
                    showDialog(data.msg, 'right', '', (()=>{location.reload()}), true, null, '', '', '', '',5);
                }


            }


        })
    })
})();
