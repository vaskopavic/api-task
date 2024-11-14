<script>
import { HeartIcon, UserIcon, ClockIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'

export default {
    name: 'Story',
    props: {
        story: {
            type: Object,
            required: true,
        },
    },
    components: {
        HeartIcon,
        UserIcon,
        ClockIcon,
        ChatBubbleLeftIcon,
    },
};
</script>

<template>
    <div class="flex flex-col items-start justify-center w-1/2 h-20 p-4 m-2 bg-white">
        <RouterLink :to="`/story/${story.id}`" class="text-lg font-semibold">{{ story.title }}
            <a :href="'//' + story.url" target="_blank"
                class="text-sm text-gray-400 hover:text-gray-500 hover:underline">({{
                    $utils.getHostFromUrl(story.url)
                }})</a>
        </RouterLink>
        <span class="text-gray-500">
            <HeartIcon class="inline-block size-4" /> {{ story.points }} |
            <UserIcon class="inline-block size-4" /> {{ story.author }} |
            <ClockIcon class="inline-block size-4" />
            {{
                $utils.formatTimeAgo(story.created_at) }} |
            <ChatBubbleLeftIcon class="inline-block size-4" /> {{
                $utils.countComments(story)
            }} comments
        </span>
    </div>
</template>
