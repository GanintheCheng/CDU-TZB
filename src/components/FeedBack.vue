<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import axios from 'axios'
const success = (message: string) => {
    ElNotification({
        title: '成功',
        message: message,
        type: 'success',
    })
}
const warn = (message: string) => {
    ElNotification({
        title: '警告',
        message: message,
        type: 'warning',
    })
}
const info01 = ref('')
const info02 = ref('')
const info03 = ref()
const options = [
    {
        "value": 1,
        "label": "车辆数量过多"
    },
    {
        "value": 2,
        "label": "高峰时段"
    },
    {
        "value": 3,
        "label": "交通事故"
    },
    {
        "value": 4,
        "label": "施工区域"
    },
    {
        "value": 5,
        "label": "交通管制"
    },
    {
        "value": 6,
        "label": "天气恶劣"
    },
    {
        "value": 7,
        "label": "道路设施缺陷"
    },
    {
        "value": 8,
        "label": "事件或突发情况"
    },
    {
        "value": 9,
        "label": "停车需求过高"
    },
    {
        "value": 10,
        "label": "节假日或特殊活动"
    },
    {
        "value": 11,
        "label": "道路管理不善"
    },
    {
        "value": 12,
        "label": "公路收费站拥堵"
    },
    {
        "value": 13,
        "label": "限行"
    },
    {
        "value": 14,
        "label": "其他"
    }
]
const grade = ref('')
const resetForm = () => {
    info01.value = ''
    info02.value = ''
    info03.value = ''
    grade.value = ''
}
const submitForm = () => {
    if (info01.value == '' || info02.value == '' || info03.value == '' || grade.value == '') {
        warn('表单不完整')
    }
    axios({
        method: 'POST',
        url: 'http://47.108.190.192:8090/api/userFeedBack',
        data: {
            region: info01.value,
            roadName: info02.value,
            reason: info03.value
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.data.code == 1) {
            success('提交成功')
        } else {
            warn('500')
        }
    }).catch((error: any) => {
        warn(error.response.status)
    })
}
</script>

<template>
    <div style="height: 100%; display: flex; flex-direction: column;">
        <dv-border-box-11 title="市民意见反馈" style="width: 100%; height: 100%; position: relative;">
            <div
                style="position: relative; width: 100%; height: 100%; padding: 60px 20px 40px 20px; display: flex; flex-direction: column;">
                <div class="box">
                    <el-alert title="为什么我们需要用户反馈?" :closable="false" type="info" show-icon
                        description="收集用户反馈的路段拥堵原因及其发生时间，我们可以帮助城市交通管理部门更精确地分析和解决交通问题。这些信息是优化交通流量、改善道路使用效率的关键。您的参与不仅有助于提升城市交通的整体运行效率，也能让每位驾驶者的通勤经历在未来更加顺畅和愉快。感谢您的支持与合作！" />
                    <el-divider />
                    <el-form style="max-width: 600px" :model="info01" label-width="auto" label-position="top">
                        <el-form-item label="您所在的区域是(例如:成都市龙泉驿区)?">
                            <el-input v-model="info01" style="width: 340px" :autosize="{ minRows: 2, maxRows: 4 }"
                                type="textarea" placeholder="请输入内容" />
                        </el-form-item>
                        <el-form-item label="您遇到的拥堵时所在的道路名称(例如:黄苑街)?">
                            <el-input v-model="info02" style="width: 340px" :autosize="{ minRows: 2, maxRows: 4 }"
                                type="textarea" placeholder="请输入内容" />
                        </el-form-item>
                        <el-form-item label="你认为发生拥堵的原因是?">
                            <!-- <el-input v-model="info03" style="width: 340px" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                    placeholder="请输入内容" /> -->
                            <el-select v-model="info03" placeholder="请选择原因" size="large" style="width: 240px">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成都交通综合满意度">
                            <el-rate v-model="grade" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <dv-decoration-9 style="width:50px;height:50px;">
                    </dv-decoration-9>
                </div>
            </div>
        </dv-border-box-11>
    </div>

</template>

<style scoped>
.box {
    max-width: 880px;
    padding: 20px;
}

/* 警告框样式 */
:deep(.el-alert) {
    background-color: rgba(25, 35, 60, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);

    .el-alert__title {
        color: #e1e1ff;
        font-weight: bold;
    }

    .el-alert__description {
        color: #ffffff;
        line-height: 1.6;
    }

    .el-alert__icon {
        color: #409EFF;
    }
}

/* 分割线样式 */
:deep(.el-divider) {
    background-color: rgba(255, 255, 255, 0.1);
}

/* 表单样式 */
:deep(.el-form) {
    .el-form-item__label {
        color: #e1e1ff;
        font-weight: bold;
        font-size: 16px;
        line-height: 1.4;
        padding-bottom: 8px;
    }

    /* 文本框样式 */
    .el-textarea__inner {
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;

        &:focus {
            border-color: #409EFF;
            background-color: rgba(255, 255, 255, 0.15);
        }

        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    /* 选择器样式 */
    .el-select {
        .el-input__inner {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
        }
    }

    /* 评分组件样式 */
    .el-rate {
        .el-rate__item {
            .el-rate__icon {
                color: #5a9cf8;
                font-size: 20px;

                &.hover {
                    color: #F7BA2A;
                }
            }
        }

        .el-rate__decimal {
            color: #F7BA2A;
        }
    }

    /* 按钮样式 */
    .el-button {
        &--primary {
            background-color: #409EFF;
            border-color: #409EFF;
            color: #ffffff;

            &:hover {
                background-color: #66b1ff;
                border-color: #66b1ff;
            }
        }

        &--default {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            color: #ffffff;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
                border-color: rgba(255, 255, 255, 0.3);
            }
        }
    }
}

/* 下拉菜单弹出框样式 */
:deep(.el-select-dropdown) {
    background-color: rgba(25, 35, 60, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);

    .el-select-dropdown__item {
        color: #ffffff;

        &.hover,
        &:hover {
            background-color: rgba(64, 158, 255, 0.2);
        }

        &.selected {
            background-color: #409EFF;
            color: #ffffff;
        }
    }
}

/* 响应式调整 */
@media only screen and (max-width: 768px) {
    .box {
        padding: 10px;
    }

    :deep(.el-form) {
        .el-form-item__label {
            font-size: 14px;
        }
    }
}
</style>
