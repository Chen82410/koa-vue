<template>
  <div class="invitation-detail-root">
    <div class="invitation-detail-bg">
      <div class="content-part">
        <div class="top">
          <div class="top-left">
            <img :src="invitationMain.author[0].avatar" class="avatar">
          </div>
          <div class="top-right">
            <span>{{invitationMain.author[0].nickname}}</span>
            <span>{{dateFormat(new Date(invitationMain.article_msg.create_time))}}</span>
          </div>
        </div>
        <h3 class="title">{{invitationMain.article_msg.title}}</h3>
        <div class="content-detail" v-html="invitationMain.article_msg.content.replace(/\n/g,'</br>')"></div>
      </div>
      <h3>所有回复({{replies.length}})</h3>
      <div class="replies" v-for="(item, index) in replies">
        <div class="replies-inside">
          <div class="replies-top">
            <div class="left">
              <img :src="item.reply_from[0].avatar">
            </div>
            <div class="right">
              <span>{{item.reply_from[0].nickname || '狗蛋'}}</span>
              <span>{{dateFormat(new Date(item.reply_time))}}</span>
            </div>
          </div>
          <div class="replies-bottom" v-html="item.reply_content.replace(/\n/g, '</br>')">         </div>
        </div>
      </div>
    </div>
    <div class="reply">
      <mu-text-field v-model="reply_content" placeholder="说点什么吧..." full-width></mu-text-field>
      <mu-icon value="send" style="margin-top:10px;" :color="color" @click="submitMsg()"></mu-icon>
    </div>
  </div>
</template>

<script>
import { replyContent } from "../../service/index.js";
import BASE64 from "../../utils/base64.js";
import Utils from "../../utils/utils.js";
import Toast from 'muse-ui-toast'

export default {
  data() {
    return {
      invitationMain: this.$route.params.invitationMain,
      color: '',
      reply_content: '',
      replies: this.$route.params.invitationMain.replies || []
    }
  },
  mounted() {
    console.log(this.invitationMain)
  },
  methods: {
    submitMsg() {
      if (this.reply_content.replace(/ /g, '').length) {
        let account = BASE64.decode(Utils.getCookie("BLOG_CHEN"))
        if (!account) {
          Toast.info('请先登陆!')
          this.$router.push('/login')
        } else {
          replyContent(this.reply_content, this.invitationMain._id, account)
            .then(res => {
              console.log(res)
              if (res.data.retcode === 1) {
                Toast.info(res.data.errMsg)
                this.reply_content = ''
                this.replies.push(res.data)
                setTimeout(() => {
                  (function smoothscroll(){
                    let currentScroll = document.documentElement.offsetHeight
                    if (currentScroll > 0) {
                      window.requestAnimationFrame(smoothscroll)
                      window.scrollTo(0,currentScroll - (currentScroll / 5))
                    }
                  })()
                }, 0)
              } else {
                Toast.info(res.data.errMsg)
              }
            })
            .catch(error => {          
              Toast.info('回复失败!')
            })
        }        
      }
    },
    dateFormat(date) {
      return Utils.dateFormat(date, 'yyyy-MM-dd hh:mm')
    }
  },
  watch: {
    reply_content(val, oldVal) {
      // console.log(val, oldVal)
      val = val.replace(/ /g, '')
      if (val.length) {
        this.color = 'blue'
      } else {
        this.color = ''
      }
    }
  },
  computed: {
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .invitation-detail-root
    width: 100%;
    box-sizing: border-box;
    padding: 24px 25% 70px 25%;
    .invitation-detail-bg
      width 100%
      box-sizing border-box
      padding 16px 24px 40px 24px
      border-radius 8px
      box-shadow 0 2px 12px 0 rgba(12, 27, 48, 0.06)
      margin-bottom 16px
      background-color #ffffff
      .content-part 
        width 100%
        box-shadow 0 2px 0 rgba(12, 27, 48, 0.06)
        margin-bottom 16px
        padding-bottom 16px
        .top
          width 100%
          display flex
          .top-left 
            width 72px
            height 72px
            border-radius 50%
            margin-right 16px
            .avatar 
              width 72px
              height 72px
              border-radius 50%
          .top-right 
            display flex
            flex-direction column
            justify-content center
            font-size 20px
            color #4d4d4d
        .content-detail 
          margin-top 16px
          font-size 18px
          color #4d4d4d
          letter-spacing 1px
      .replies
        width 100%
        box-sizing border-box
        padding 12px 16px
        border-bottom 1px solid rgba(12, 27, 48, 0.06)        
        .replies-inside
          width 100%
          .replies-top
            display flex
            .left
              width 72px 
              height 72px
              border-radius 50%
              img
                width 72px
                height 72px
                border-radius 50%
            .right
              display flex
              flex-direction column
              justify-content center
              margin-left 16px
              font-size 18px
              color #4d4d4c
          .replies-bottom
            width 100%
            box-sizing border-box
            padding 10px 90px
    .reply
      position fixed
      width 50%
      bottom 0
      left 25%
      display flex
      background-color #fff
</style>


