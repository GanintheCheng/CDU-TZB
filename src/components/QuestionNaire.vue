<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from "vue";
import { ElNotification, ElTable } from 'element-plus'
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
const question1 = {
    type: 0,
    range: 0,
    title: '1.您的年龄范围是？',
    question: ['A. 18-25岁', 'B. 26-35岁', 'C. 36-45岁', 'D. 46岁及以上'],
    choice: '',
    input: ''
};
const question2 = {
    type: 0,
    range: 0,
    title: '2.您的性别是？',
    question: ['A. 男', 'B. 女'],
    choice: '',
    input: ''
};
const question3 = {
    type: 0,
    range: 0,
    title: '3.您所在的地区',
    question: ['A. 锦江区', 'B. 青羊区', 'C. 金牛区', 'D. 武侯区', 'E. 成华区', 'F. 龙泉驿区', 'G. 青白江区', 'H. 新都区', 'I. 温江区', 'J. 双流区', 'K. 郫都区', 'L. 新津区'],
    choice: '',
    input: ''
};
const question4 = {
    type: 1,
    range: 0,
    title: '4.您平时的主要出行方式是？',
    question: ['A. 私家车', 'B. 公交车', 'C. 地铁', 'D. 出租车/网约车', 'E. 自行车/电动车', 'F. 步行', 'G. 其他（请注明）'],
    choice: [] as number[],
    input: ''
};
const question5 = {
    type: 1,
    range: 1,
    title: '1.您认为成都交通拥堵的主要原因是什么？',
    question: ['A. 红绿灯设置不合理', 'B. 拥堵路段管理不当', 'C. 路段导流不畅', 'D. 停车不便', 'E. 道路施工', 'F. 交通信号灯故障', 'G. 天气等不可抗力因素', 'H. 车辆数量过多', 'I. 公共交通设施不足（或公共交通站点设置不合理）', 'J. 其他（请注明）'],
    choice: [],
    input: ''
};
const question6 = {
    type: 0,
    range: 1,
    title: '2.您认为这些问题严重程度如何？',
    question: ['A. 非常严重', 'B. 比较严重', 'C. 一般', 'D. 不太严重', 'E. 不严重'],
    choice: '',
    input: ''
};
const question7 = {
    type: 1,
    range: 1,
    title: '3.您通常在哪个时间段遇到交通拥堵的情况最频繁',
    question: ['A. 早上上班高峰（7:00-9:00）', 'B. 中午时段（11:00-14:00）', 'C. 下午下班高峰（17:00-19:00）', 'D. 晚上休闲娱乐时段', 'E. 周末或节假日', 'F. 其他时间段'],
    choice: [],
    input: ''
};
const question8 = {
    type: 1,
    range: 1,
    title: '4.您认为成都哪些区域交通拥堵问题最为严重?',
    question: ['A. 商业中心', 'B. 学校周边', 'C. 医院附近', 'D. 居民区周边', 'E. 交通枢纽（火车站、汽车站）', 'F. 其他（具体说明）'],
    choice: [],
    input: ''
};
const question9 = {
    type: 0,
    range: 2,
    title: '1.您是否经常使用公共交通工具？',
    question: ['A. 是', 'B. 否'],
    choice: '',
    input: ''
};
const question10 = {
    type: 1,
    range: 2,
    title: '2.如果否，阻碍您使用公共交通工具的主要原因是什么？',
    question: ['A. 公共交通站点距离设置不当', 'B. 公共交通线路设置不当', 'C. 公共交通工具的发车频率低，等待时间长', 'D. 其他（请注明）'],
    choice: [],
    input: ''
};
const question11 = {
    type: 0,
    range: 3,
    title: '您认为城市在缓解交通拥堵问题上应该优先考虑的方面是？',
    question: ['A. 建设更多交通道路', 'B. 发展公共交通', 'C. 鼓励非机动车出行', 'D. 限制机动车数量', 'E. 其他（请注明）'],
    choice: '',
    input: ''
};
const question12 = {
    type: 2,
    range: 4,
    title: '您对城市交通管理还有哪些建议？',
    question: [''],
    choice: '',
    input: ''
};
const question13 = {
    type: 2,
    range: 4,
    title: '您认为如何才能更好地缓解交通拥堵问题？',
    question: [''],
    choice: '',
    input: ''
};
const question14 = {
    type: 2,
    range: 4,
    title: '您希望未来城市交通发展成什么样子？',
    question: [''],
    choice: '',
    input: ''
};

const userName = {
    type: 2,
    range: 4,
    title: '怎么称呼您？',
    question: [''],
    choice: '',
    input: ''
}

const question = ref([
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    question11,
    question12,
    question13,
    question14,
    userName
])
//弹出层 
const openSuccess = (message: string) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}
const openWarning = (message: string) => {
    ElNotification({
        title: 'Warning',
        message: message,
        type: 'warning',
    })
}
const openError = (message: string) => {
    ElNotification({
        title: 'Error',
        message: '失败,错误码为' + message + ',请联系管理员',
        type: 'error',
    })
}
const nowNum = ref(0)
const show = ref(true)
watch(nowNum, () => {
    show.value = false
    setTimeout(() => {
        show.value = true
    }, 300);
})
const handleNum = (num: number) => {
    nowNum.value += num;
    // 延迟执行滚动操作以确保视图更新完成
    // 移动到页面顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
const commit = () => {
    const answers = [];
    const user = question.value[question.value.length - 1].input.trim();
    if (!user) {
        openWarning('请确保您所有题目回答完毕！')
        return;
    }
    for (let i = 0; i < question.value.length - 1; i++) {
        const q = question.value[i];
        if (q.type != 2 && (q.choice == '' || q.choice.length == 0)) {
            openWarning('请确保您所有题目回答完毕！')
            return;
        } else if (q.type == 1 && q.choice.includes((q.question.length - 1) + '') && q.input.trim() == '') {
            openWarning('请确保您所有题目回答完毕！')
            return;
        } else if (q.type == 2 && q.input.trim() == '') {
            openWarning('请确保您所有题目回答完毕！')
            return;
        }
        let answer = '';
        if (q.type == 0) {
            answer = q.question[q.choice];
        } else if (q.type == 1) {
            answer = q.choice.map((index) => {
                if (index == q.question.length - 1) {
                    return `${q.question[index].charAt(0)}.其他:${q.input.trim()}`;
                } else {
                    return q.question[index];
                }
            }).join('; ');
        } else if (q.type == 2) {
            answer = q.input.trim();
        }
        answers.push({
            name: user,
            question: `${q.title}`,
            answer: answer
        });
    }
    console.log(JSON.stringify(answers));
    axios({
        method: 'POST',
        url: 'http://47.108.190.192:8090/api/survey',
        data: JSON.stringify(answers), // 直接传递字符串格式的数组
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        openSuccess('表单提交成功 感谢您的参与')
        isInput.value = true
        store.isInput = true
    }).catch(error => {
        if (error.response) {
            // 请求已发送且服务器有响应，但响应状态码不在2xx范围内
            openSuccess('上传出错，服务器响应错误:' + error.response.data)
        } else if (error.request) {
            // 请求已发送但没有收到响应
            openSuccess('上传出错，服务器响应错误:' + error.request)
        } else {
            // 发送请求时出现错误
            openSuccess('上传出错，服务器响应错误:' + error.message)
        }
    });
};

//是否填写
const isInput = ref(store.isInput)
</script>

<template>
    <div>
        <div class="top">
            <header class="header">
                <h1>城市拥堵调查问卷</h1>
            </header>
            <div class="title">
                <div class="item">
                    <div class="imgbox" style="background-color:#dfeaee ;">
                        <img src="@/static/header01.svg" alt="">
                    </div>
                    <div class="text">匿名回答 我们保证您的信息安全</div>
                </div>
                <div class="item">
                    <div class="imgbox" style="background-color:#ebe7dc ;">
                        <img src="@/static/header02.svg" alt="">
                    </div>
                    <div class="text">了解城市拥堵的根源与解决方案</div>
                </div>
                <div class="item">
                    <div class="imgbox" style="background-color: #ece3f2;">
                        <img src="@/static/header03.svg" alt="">
                    </div>
                    <div class="text">真实回答 共建美好成都 </div>
                </div>
            </div>
        </div>

        <div v-if="!isInput">
            <div class="progress">
                <el-progress :percentage="(nowNum + 1) * 20" :stroke-width="15" striped
                    style="max-width: 1000px;margin: 0 auto;" />
            </div>
            <transition name="el-zoom-in-center">
                <div v-show="show" class="transition-box">
                    <div class="question">
                        <div class="questiontitle">
                            <h3 v-show="nowNum == 0">基本信息</h3>
                            <h3 v-show="nowNum == 1">交通问题反馈</h3>
                            <h3 v-show="nowNum == 2">公共交通工具的使用</h3>
                            <h3 v-show="nowNum == 3">政府优先考虑方面</h3>
                            <h3 v-show="nowNum == 4">建议与期望</h3>
                        </div>
                        <div class="item" v-for="(item, index) in question" :key="index">
                            <div v-if="item.range == nowNum">
                                <div class="num">
                                    {{ item.title }}
                                    <span v-if="item.type == 0">(单选)</span>
                                    <span v-if="item.type == 1">(多选)</span>
                                </div>
                                <div class="info">
                                    <el-radio-group v-model="item.choice" size="large" v-if="item.type == 0">
                                        <el-radio-button v-for="(item2, index2) in item.question" :key="index2"
                                            :value="index2 + ''">
                                            {{ item2 }}
                                        </el-radio-button>
                                    </el-radio-group>
                                    <el-checkbox-group v-model="item.choice" size="large" v-if="item.type == 1">
                                        <el-checkbox-button v-for="(item2, index2) in item.question" :key="index2"
                                            :value="index2 + ''">
                                            {{ item2 }}
                                        </el-checkbox-button>
                                    </el-checkbox-group>
                                    <div style="margin-top: 10px;">
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的想法"
                                            clearable v-if="index == 3 && item.choice.includes('6')" />
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的想法"
                                            clearable v-if="index == 4 && item.choice.includes('9')" />
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的想法"
                                            clearable v-if="index == 6 && item.choice.includes('5')" />
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的想法"
                                            clearable v-if="index == 7 && item.choice.includes('5')" />
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的想法"
                                            clearable v-if="index == 9 && item.choice.includes('3')" />
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的想法"
                                            clearable v-if="index == 10 && item.choice == '4'" />
                                        <el-input v-model="item.input" style="width: 240px" placeholder="请输入您的回答"
                                            clearable v-if="item.type == 2" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </transition>

            <div class="bt">
                <el-button type="primary" round size="20px" :disabled="nowNum == 0"
                    @click="handleNum(-1)">上一个</el-button>
                <el-button type="success" round size="20px" :disabled="nowNum == 4"
                    @click="handleNum(1)">下一个</el-button>
                <el-button type="danger" round size="20px" v-show="nowNum == 4" @click="commit"
                    :disabled="isInput">提交</el-button>
            </div>
        </div>
        <div v-else style="">
            <el-card style="width: 100%;">
                <template #header>
                    <div class="card-header">
                        <span>感谢填写！</span>
                    </div>
                </template>
                <el-result icon="success" title="填写成功" sub-title="欢迎分享链接"></el-result>
                <template #footer>共创美好明天</template>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #33a474;

    h1 {
        font-size: 30px;
        font-weight: bolder;
        color: white;
    }
}

.title {
    width: 100%;
    height: 200px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-bottom: 20px;

    .item {
        width: 200px;
        height: 200px;
        /* margin-right: 100px; */
        /* margin-right: 50px; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .imgbox {
            /* background-color: skyblue; */
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
        }

        img {
            height: 100px;
            width: 100px;
            margin-bottom: 20px;
        }

        .text {
            width: 80%;
            font-size: 14px;
        }
    }
}

.title .item {
    margin-right: 50px;
}

.question {
    h3 {
        font-size: 25px;
    }

    margin-top: 10px;
    background-color: white;

    .item {
        margin-bottom: 20px;
    }

    .questiontitle {
        margin-bottom: 10px;
    }

    .num {
        margin-bottom: 10px;
        font-size: 20px;
    }

    .el-radio-button,
    .el-radio-button__innerp {
        margin-bottom: 10px;
    }
}

@media only screen and (max-width: 768px) {
    .title .item {
        margin-right: 0px;
    }
}
</style>
