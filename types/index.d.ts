import Vue, { VueConstructor} from 'vue'

export interface FeedbackPlugin {
    install(Vue: VueConstructor, args?: any): void
    version: string
}

declare const Feedback: FeedbackPlugin
export default Feedback