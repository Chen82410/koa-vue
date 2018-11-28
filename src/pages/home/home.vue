<template>
  <div class="home-root">
    <div class="home-bg">
      <div class="content-part" v-for="(item, index) in invitationList" @click="toInvitationDetail(item._id)">
        <div class="top">
          <div class="top-left">
            <img :src="item.author[0].avatar" class="avatar">
          </div>
          <div class="top-right">
            <span>{{item.author[0].nickname}}</span>
            <span>{{dateFormat(new Date(item.article_msg.create_time))}}</span>
          </div>
        </div>
        <h3 class="title">{{item.article_msg.title}}</h3>
        <div class="content-detail" v-html="item.article_msg.content.replace(/\n/g,'</br>')"></div>
        <div class="comment-favor">
          <div class="comment">
            <mu-icon size="24" value="message" color=""></mu-icon>
            <span>{{item.replies.length || 0}}</span>
          </div>
          <div class="favor">
            <mu-icon size="24" value="favorite" :color="item.is_my_favor ? 'blue' : ''" @click.stop="toFavor(item, index)"></mu-icon>
            <span>{{item.favor_cnt || 0}}</span>
          </div>
        </div>
      </div>
    </div>
    <mu-flex justify-content="center">
      <mu-pagination raised circle :total="count" :current.sync="current" :page-size="pageSize" @change="pageChange()"></mu-pagination>
    </mu-flex>
    <router-view></router-view>
  </div>
</template>

<script>
import { getInvitationList, favor } from "../../service/index.js";
import BASE64 from "../../utils/base64.js";
import Utils from "../../utils/utils.js";
import Toast from 'muse-ui-toast'

export default {
  data() {
    return {
      invitationList: [],
      current: 1,
      count: 0,
      pageSize: 5
    };
  },
  created() {
    let tempName = Utils.getCookie("BLOG_CHEN");
    if (Utils.getCookie("BLOG_CHEN")) {
      Utils.setCookie("BLOG_CHEN", tempName, 1);
      this._getInvitationList(this.current, this.pageSize, BASE64.decode(Utils.getCookie("BLOG_CHEN")))
    } else {
      Toast.info('请先登录!')
      this.$router.push({
        path: "/login"
      });
    }
  },
  methods: {
    pageChange() {
      (function smoothscroll(){
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)
          window.scrollTo(0,currentScroll - (currentScroll / 5))
        }
      })()
      this._getInvitationList(this.current, this.pageSize)
    },
    _getInvitationList(current, size) {
      getInvitationList(current, size, BASE64.decode(Utils.getCookie("BLOG_CHEN")))
        .then(res => {
          console.log(res);
          this.invitationList = res.data
          this.count = res.totalCount
        })
        .catch(error => {
          console.log(error);
        });
    },
    toInvitationDetail(content_id) {
      this.$router.push({
        path: 'invitationDetail',
        name: 'InvitationDetail',
        params: {
          content_id: content_id
        }
      })
    },
    toFavor(item, index) {//content_id, favor_type, account
      item.is_my_favor = item.is_my_favor || 0
      let favorType = [1,0]
      // console.log(typeof parseInt(item.is_my_favor), item.is_my_favor)
      if (!BASE64.decode(Utils.getCookie("BLOG_CHEN"))) {
        Toast.info('您还未登陆!')
        this.$router.push('/login')
        return
      }
      favor(item._id, favorType[item.is_my_favor],BASE64.decode(Utils.getCookie("BLOG_CHEN")))
        .then(res => {
          console.log(res)
          if (res.retcode) {
            this.invitationList[index].is_my_favor = favorType[item.is_my_favor]
            if (item.is_my_favor) {
              this.invitationList[index].favor_cnt++
            } else {
              this.invitationList[index].favor_cnt--
            }
            Toast.info(res.errMsg)
          }
        })
        .catch(err => {
          console.log(err)
          Toast.info(res.errMsg)
        })
    },
    dateFormat(date) {
      return Utils.dateFormat(date, 'yyyy-MM-dd hh:mm')
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.home-root {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 5%;
  .home-bg {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(12, 27, 48, 0.06);
    margin-bottom 16px
    background-color #ffffff
    .content-part {
      width: 100%;
      box-shadow 0 2px 0 rgba(12, 27, 48, 0.06)
      margin-bottom 16px
      padding-bottom 16px
      .top {
        width: 100%;
        display: flex;

        .top-left {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin-right: 16px;

          .avatar {
            width: 72px;
            height: 72px;
            border-radius: 50%;
          }
        }

        .top-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 20px;
          color: #4d4d4d;
        }
      }
      .title {
        
      }
      .content-detail {
        margin-top: 16px;
        font-size: 18px;
        color: #4d4d4d;
        letter-spacing: 1px;
      }
      .comment-favor {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 18px;
        color: #4d4d4d;
        .comment {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 12px;
          span {
            margin-left: 24px;
          }
        }
        .favor {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            margin-left: 24px;
          }
        }
      }
    }
  }
}
</style>
