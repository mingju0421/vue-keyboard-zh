<template>
    <div class="keyWrap" ref="keyboard">
        <div class="normal" v-if="layout == 'normal'">
            <div class="hint" :class="{height: language == 'ch'}">
                <div class="word">{{word}}</div>
                <div class="words">
                    <span v-for="(word, index) in words" :key="word" @click="selectWord(word)"><span class="order">{{index + 1}}. </span>{{word}}</span>
                    <span v-if="zhWordSet.length > 7"><span @click="page -= 1" :class="{notallowed: page == 0}" style="margin-right: 10px">-</span><span @click="page += 1"
                            :class="{notallowed: zhWordSet.length / 7 - 1 < page }">+</span></span>
                </div>
            </div>
            <div @click="touch">
                <div class="row" v-for="(keys, index) in (isShift ? shiftKeyList : keyList)" :key="index">
                    <span class="key" v-for="(key, index) in keys" :key="index"
                        :class="[{letter: /^[a-zA-Z]{1}$/.test(key)}, {toUpper: isToUpper}, {selected: key == 'Shift' && isShift}, {selected: key == 'Caps' && isToUpper}, {control: key.length > 2}]">{{key}}</span>
                </div>
                <div class="row">
                    <span class="key space">Space</span>
                    <span class="key language" v-if="language == 'ch'">中文</span>
                    <span class="key language" v-else>英文</span>
                    <span class="key Close">Close</span>
                </div>
            </div>
        </div>
        <div class="number" v-if="layout == 'numeric'">
            <div @click="touch">
                <div class="row" v-for="(keys, index) in numberList" :key="index">
                    <span class="key" v-for="key in keys" :key="key" :class="[{third: key == '0'}, {ninth: key == '_' || key == '-' || key == '.'}, {half: key == 'Delete' || key == 'Close'}]">{{key}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Zh from './zh.js'
export default {
    name: 'Keyboard',
    data() {
        return {
            page: 0,
            zhWordSet: [],
            word: '',
            zhKeys: Object.keys(Zh),
            language: 'en',
            close: true,
            isShift: false,
            isToUpper: false,
            keyList: [
                ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Delete'],
                ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
                ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
                ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift']
            ],
            shiftKeyList: [
                ['~', '!', '@', "#", "$", '%', '^', '&', "*", '(', ')', '_', "+", 'Delete'],
                ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
                ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', `"`, 'Enter'],
                ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift']
            ],
            numberList: [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['_', '-', '.', '0', 'Delete', 'Close']
            ]
        }
    },
    mounted() {
        document.body.appendChild(this.$el);
        let top = this.offsetTop(this.input) + this.input.offsetHeight + 10 + 'px'
        this.$refs.keyboard.style.top = top
    },
    props: {
        input: [HTMLInputElement, HTMLTextAreaElement],
        layout: {
            type: String,
            default: 'normal',
            validator: value => {
                let validator = {
                    normal: true,
                    numeric: true
                }
                return validator[value]
            }
        },
        cancel: Function
    },
    methods: {
        offsetTop(el) {
            let offsetTop = 0
            while (el && el.tagName !== 'BODY') {
                offsetTop += el.offsetTop
                el = el.offsetParent
            }
            return offsetTop
        },
        selectWord(word) {
            this.input.value += word
            this.input.dispatchEvent(new Event("input", { bubbles: true }));
            this.input.focus();
            this.word = ''
            this.zhWordSet = []
        },
        touch(e) {
            if (e.target.innerText == 'Close') {
                this.cancel()
                return
            }
            if (this.language == 'en') {
                if (e.target.nodeName == 'SPAN') {
                    let result = ''
                    let value = this.input.value
                    const innerText = e.target.innerText
                    switch (innerText) {
                        case '英文':
                            result = value
                            this.language = 'ch'
                            break;
                        case 'Enter':
                            result = value
                            this.$emit('change')
                            break;
                        case 'Delete':
                            result = value && value.substr(0, value.length - 1)
                            break;
                        case 'Tab':
                            result = value + '\n'
                            break;
                        case 'Space':
                            result = value + ' '
                            break;
                        case 'Caps':
                            result = value
                            this.isToUpper = !this.isToUpper
                            if (this.isToUpper) this.isShift = false
                            break
                        case 'Shift':
                            result = value
                            this.isShift = !this.isShift
                            if (this.isShift) this.isToUpper = false
                            break
                        default:
                            result = value + innerText
                    }
                    this.input.value = result
                }
            } else {
                if (e.target.nodeName == 'SPAN') {
                    const innerText = e.target.innerText
                    if (innerText === '中文') {
                        this.language = 'en'
                        this.word = ''
                    } else if (innerText === 'Delete') {
                        if (this.word) this.word = this.word && this.word.substr(0, this.word.length - 1)
                        else {
                            let text = this.input.value
                            text && (this.input.value = text.substr(0, text.length - 1))

                        }
                    } else if (/^[a-z]{1}$/.test(innerText))
                        this.word += innerText
                    else if (/^[1-7]$/.test(innerText) && this.words[+innerText - 1]) this.selectWord(this.words[+innerText - 1])
                    else if (innerText.length == 1) this.selectWord(innerText)
                    else if (innerText == 'Space') this.selectWord(' ')
                    else if (innerText == 'Tab') this.selectWord('\n')


                    if (this.word) {
                        this.page = 0
                        const zhWordSet = new Set()
                        this.zhKeys.filter(key => new RegExp(`^${this.word}`).test(key)).forEach(key => {
                            for (let word of Zh[key])
                                zhWordSet.add(word)
                        })
                        this.zhWordSet = Array.from(zhWordSet)
                    } else this.zhWordSet = []
                }
            }
            this.input.dispatchEvent(new Event("input", { bubbles: true }));
            this.input.focus();
        }
    },
    computed: {
        words() {
            let result = []
            for (let i = this.page * 7; (i < this.page * 7 + 7) && i < this.zhWordSet.length; i++)
                result.push(this.zhWordSet[i])
            return result
        }
    },
    watch: {
        input(value) {
            let top = this.offsetTop(value) + value.offsetHeight + 10 + 'px'
            this.$refs.keyboard.style.top = top
        }
    }

}
</script>

<style scoped>
.key {
    user-select: none;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin: 5px;
    flex-grow: 1;
    line-height: 2.5;
    text-align: center;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
    width: 1em;
}
.key:hover {
    background-color: #ccc;
}
.row {
    display: flex;
}
.close {
    flex-grow: 0;
    width: auto;
    padding: 0 15px;
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}
.keyWrap {
    width: 100%;
    position: absolute;
    user-select: none;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 9;
}
.toUpper.letter {
    text-transform: uppercase;
}
.selected.control {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}
.control {
    color: #fff;
    background-color: #7d7d7d;
    border-color: #656565;
}
.space {
    flex-grow: 10;
}
.hint {
    display: flex;
}
.hint .word {
    width: 20%;
}
.hint .words {
    width: 80%;
}
.hint .words > span {
    display: inline-block;
    width: 6%;
    margin: 0 3%;
}
.height {
    line-height: 30px;
    height: 30px;
}
.notallowed {
    cursor: not-allowed;
    color: #ccc;
    pointer-events: none;
}
.key:active {
    transform: scale(0.98);
    color: #333;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
}
.third {
    width: 33.3%;
}
.half {
    width: 16%;
}
.ninth {
    width: 10.2%;
}
.order {
    color: #ccc;
}
</style>