<template>
  <div class="mine-root">
    <mu-container>
      <mu-avatar class="avatar" style="margin-top: 40px; margin-bottom: 20px; margin-left: 50%; transform: translateX(-36px);" color="indigo" size="72">
        <img :src="src" alt="" @click="setAvatar()">
        <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display:none" @change="changeImage($event)" ref="avatarInput">
      </mu-avatar>
      <div style="display: flex; justify-content: center;">
        <mu-button color="primary" @click="submitAvatar()">设置头像</mu-button>
      </div>
      <mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
        <mu-form-item prop="nick_name" label="昵称">
          <mu-text-field v-model="form.nickname"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="signature" label="个性签名">
          <mu-text-field v-model="form.signature"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="birthday" label="生日">
          <mu-date-input v-model="form.birthday" type="date" actions></mu-date-input>
        </mu-form-item>
        <mu-form-item prop="gender" label="性别">
          <mu-radio v-model="form.gender" value="male" label="男"></mu-radio>
          <mu-radio v-model="form.gender" value="female" label="女"></mu-radio>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit()">提交</mu-button>
          <mu-button @click="clear()">重置</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
    <mu-container>
      <mu-paper class="demo-paper" :z-depth="5"></mu-paper>
    </mu-container>
  </div>
</template>

<script>
import { postPersonalData, postAvatar, getPersonalMsg, test } from "../../service/index.js";
import VueCoreImageUpload from "vue-core-image-upload";
import Utils from "../../utils/utils.js";
import BASE64 from "../../utils/base64.js";
import Toast from "muse-ui-toast";

export default {
  data() {
    return {
      labelPosition: "left",
      form: {
        nickname: "",
        signature: "",
        birthday: "",
        gender: ""
      },
      src: ""
    };
  },
  created() {
    this._getPersonalMsg()
  },
  methods: {
    submit() {
      let that = this      
      if (!Utils.getCookie("BLOG_CHEN")) {
        Toast.info("请先登录!");
        this.$router.push("/login");
        return;
      }
      let account = BASE64.decode(Utils.getCookie("BLOG_CHEN"));
      this.form.birthday = this.form.birthday || Utils.dateFormat(this.form.birthday, "yyyy-MM-dd");
      postPersonalData(account, JSON.stringify(this.form))
        .then(res => {
          // console.log(res)
          that.clear()
          Toast.info(res.data.errMsg)
          that._getPersonalMsg()
        })
        .catch(error => {
          console.log(error)
        });
    },
    changeImage(e) {
      console.log(e)
      let file = e.target.files[0]
      let reader = new FileReader()
      let that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that.src = this.result
      }
    },
    submitAvatar() {
      if (this.src.indexOf('http') !== -1) {
        Toast.info('您还没有变更头像哦!')
        return
      }
      if (!Utils.getCookie("BLOG_CHEN")) {
        Toast.info("请先登录!");
        this.$router.push("/login");
        return;
      }
      let account = BASE64.decode(Utils.getCookie("BLOG_CHEN"))
      let reader = new FileReader()
      let file = this.$refs.avatarInput.files[0]
      // http://localhost:3002/personal_data/avatar
      if (this.$refs.avatarInput.files.length !== 0) {
        console.log(this.$refs.avatarInput.files[0])
        let imageType = ''
        let imageTypeSlice = this.src.slice(0,18)
        if (imageTypeSlice.startsWith("data:image/gif;")) {
          imageType = 'gif'
        } else if (imageTypeSlice.startsWith("data:image/png;")) {
          imageType = 'png'
        } else if (imageTypeSlice.startsWith("data:image/jpg;")) {
          imageType = 'jpg'
        } else if (imageTypeSlice.startsWith("data:image/jpeg;")) {
          imageType = 'jpeg'
        }
        let imageBase64 = this.src.substring
        (this.src.indexOf(",") + 1)
        postAvatar(account, imageBase64, imageType)
          .then(res => {
            if (res.data.retcode === 1) {
              Toast.info(res.data.errMsg)
            }
            console.log(res)
          })
          .catch(err => {

          })
      }
    },
    clear() {
      this.form = {
        nickname: "",
        input: "",
        date: "",
        radio: ""
      };
    },
    setAvatar() {
      this.$refs.avatarInput.click()
    },
    _getPersonalMsg() {
      let account = BASE64.decode(Utils.getCookie("BLOG_CHEN"))
      getPersonalMsg(account)
        .then(res => {
          console.log(res)
          this.src = res.avatar
          this.form.nickname = res.nickname
          this.form.signature = res.signature || ''
          this.form.birthday = res.birthday || ''
          this.form.gender = res.gender || ''
        }).catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    VueCoreImageUpload
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mine-root {
  width: 100%;
  height: 100%;
  background-color #fff
  .btn-primary {
    margin-left: 50%;
    transform: translateX(-44px);
    margin-bottom: 50px;
    width: 87px;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 5px;
    background: rgb(33, 150, 243);
    color: #fff;
  }

  .mu-demo-form {
    margin: 0 auto;
    width: 320px;
    max-width: 460px;
  }
}
</style>
