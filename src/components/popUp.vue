<template>
    <div class="popup_outer" :class="{'phone':isPhone}">
        <div class="trade_success item" v-if="type === 'success'">
            <div class="icon">
                <img src="@/assets/img/tradeSuccess.png" alt="">
            </div>
            <div class="info">
                <p :class="{'noHash':!typeData.hash}">
                    {{$t(typeData.type === 'approve' ? 'popup_approve_success' :'popup_success')}} 
                </p>
                <a 
                    v-if="typeData.hash"
                    :class="{'notZH':$i18n.locale !== 'zh_CN'}"
                    :href="httpAddress"  target="_blank">{{$t('popup_browser')}}</a>
            </div>
            <div class="close" @click="closePopUp"></div>
        </div>
        <div class="trade_pending item" v-if="type === 'pending'">
            <div class="icon">
                <img src="@/assets/img/trading.png" alt="">
            </div>
            <div class="info">
                <span class="num">{{pendingOrderAmount}}</span>
                <span>{{$t('popup_pending')}}</span>
            </div>
            <div class="close" @click="closePopUp"></div>
        </div>
        
        <div class="trade_pending item construction"  :class="{'notZH':$i18n.locale !== 'zh_CN'}" v-if="type === 'construction'">
            <div class="icon">
                <img src="@/assets/img/jianshe.svg" alt="">
            </div>
            <div class="info">
                <span
                    :class="{'notZH':$i18n.locale !== 'zh_CN'}"
                >{{$t('popup_processing')}}...</span>
            </div>
            <div class="close" @click="closePopUp"></div>
        </div>
        <div class="trade_fail item" v-if="type === 'fail'">
            <div class="icon">
                <img src="@/assets/img/tradeFail.png" alt="">
            </div>
            <div class="info">
                <p :class="{'noHash':!typeData.isUserDeny&&!typeData.hash &&!typeData.errType}">
                    {{$t(typeData.type === 'approve' ? 'popup_approve_failed' :'popup_failed')}}
                </p>
                <span v-if="typeData.isUserDeny">{{$t('popup_refuse')}}</span>
                <span v-if="typeData.errType">{{$t(typeData.errType)}}</span>
                <a 
                    v-if=" !typeData.isUserDeny&& typeData.hash"
                    :class="{'notZH':$i18n.locale !== 'zh_CN'}"
                    :href="httpAddress"   
                    target="_blank">{{$t('popup_browser')}}</a>
            </div>
            <div class="close" @click="closePopUp"></div>
        </div>


        <div class="close_line"></div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
    name:'popUp',
    props:{
        typeData:{
            type:Object,
            default:()=>{ return {} }
        },
        type:String
    },
    data(){
        return {
            timeOut:null,
            isPhone:false
        }
    },
    created(){
        if (location.search.indexOf('?pc') !== 0 && /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent)){
            this.isPhone = true
        }
    },
    mounted(){
        this.timeOut = setTimeout(()=>{
            let status = {}
            if(this.type === 'fail' || this.type === 'success'){
                status.id = this.typeData.id
            }else {
                status.kind = this.type
            }
            this.$store.dispatch('closePopUp' , status)
        },10800)
    },
    computed:{
        ...mapGetters([
            "pendingOrderAmount"
        ]),
        // ...mapState({
        //     tradeStatus:state=>state.base.tradeStatus
        // }),
        // pendingOrderAmount(){
        //     let arr = this.tradeStatus.list.filter(ele=> ele.val === 0)
        //     return arr.length
        // },
        httpAddress(){
            return 'https://bscscan.com/tx/' + (this.typeData.hash || '')
        }
    },
    beforeDestroy(){
        clearTimeout(this.timeOut)
        this.timeOut = null 
    },
    watch:{
        pendingOrderAmount:{
            handler(val){
                if(!val){
                    this.closePopUp()
                }
            }
        }
    },
    methods:{
        closePopUp(){
            clearTimeout(this.timeOut)
            this.timeOut = null 
            let status = {}
            if(this.type === 'fail' || this.type === 'success'){
                status.id = this.typeData.id
            }else {
                status.kind = this.type
            }
            this.$store.dispatch('closePopUp' , status)
        }
    }
}
</script>
<style lang="less" scoped>
.popup_outer {
    width:3rem;
    height:.8rem;
    line-height:.8rem ;
    // position fixed
    // top 60px
    // right calc(50% - 720px)
    position:relative;
    background-color:#fff;
    box-shadow: 0px 2px 20px 0px rgba(170, 170, 170, 0.25); 
    border-radius:10px;
    overflow:hidden;
    // opacity 0
    // animation: showPopDown 0.5s ease-out 0  forwards;
    animation: showPopDown 0.5s linear forwards;
    .icon {
        width:.77rem;
        height: 100%;
        line-height: .6rem;
        img {
            width:.44rem;
            height: .44rem;
            margin: 0 0 0 .2rem;
        }
    }
    .item {
        display: flex;
        position: relative;
        >div {
            // height 80px
        }
        .close {
            position: absolute;
            width: .18rem;
            height: .18rem;
            right: 13px;
            top: 13px;
            background: url('~@/assets/img/dialog_close.png') no-repeat;
            background-size: contain;
            cursor: pointer;
        }
        .info {
            line-height: 20px;
            padding-left: 10px;
            .notZH{
                font-size :14px;
            }
            p{
                padding-bottom: 0;
            }
            a, span{
                position: relative;
                top: -.16rem;
            }
        }
        .noHash{
            padding-top :30px;
        }
        
    }
    .trade_success .info {
        line-height: 10px;
        p {
            font-size: .2rem;
            line-height: 20px;
            font-weight: 600;
            padding: 16px 0 0 0;
            color: #39BC1F;
        }
        .noHash {
            padding-top:30px;
        }
        
        a {
            font-size: 18px;
            line-height: 20px;
            text-decoration: underline;
            color: #FFC200;
            
        }
        
    }
    .trade_fail {
         p {
            font-size: .2rem;
            line-height: 20px;
            font-weight: 600;
            padding: .16rem 0 0 0;
            color: #f00;
        }
        span {
            font-size: 16px;
            font-weight: 600;
            color: #000;
        }
        a {
            font-size: 18px;
            text-decoration: underline;
            color: #FFC200;
        }
    }
    .trade_pending {
        .info{
            font-size: 18px;
            line-height: 20px;
            font-weight: 600;
            padding-top: .3rem;
            .num {
                color: #FFC200;
                display: inline-block;
                margin-right: 12px;
            }
            span {
                position: relative;
                top: 0;
                color: #000;
            }
        }
        .icon {
            img{
                transform: rotateZ(360deg);
                transform-origin: .2rem .22rem;
                animation: imgRotating 2s linear    infinite;
            }
                    
        }
    }
    .trade_pending.construction {
        .icon{
            img{
                animation: none;
            }
        }
    }
    .trade_pending.notZH{
        .info{
            padding-top: 20px;
        }
    }
    .close_line {
        position: absolute;
        height: 4px;
        width: 100%;
        border-radius: 2px;
        background-color: #FFC200;
        bottom: 0px;
        left: 0px;
        animation: closeLine 10s linear 0.8s forwards ;
    }
    
}
.popup_outer.phone{
    min-height: 1rem;
    width: 3.6rem;
    padding-bottom: .1rem;
    height: auto;
    .item{
        .icon{
            line-height: 1rem;
            img{
                height: .56rem;
                width: .56rem;
            }
        }

        .info{
            .notZH{
                font-size: .24rem;
            }
            p{
                font-size: .32rem;
            }
            a{
                font-size: .24rem;
                line-height: 0rem;
            }
        }
        .close{
            height: .24rem;
            width: .24rem;
        }
    }
    .trade_pending{
        .icon{
            img{
                transform: rotateZ(360deg);
                transform-origin: .26rem .28rem;
            }
        }
        .info{

            padding-top: .36rem;
        }
    }
}
@keyframes closeLine {
    0% {
        width: 100%;
    }
    100% {
        width: 0%;
    }
}
@keyframes showPopDown {
    0% {
        top: -30px;
        opacity: 0;
    }
    100%{
        top: 0px;
        opacity: 1;
    }
}

@keyframes imgRotating {
    0%{
        transform:rotateZ(360deg);
    }
    100%{
        transform:rotateZ(0deg);
    }
}
</style>
