<script>
export default {
    name: 'Comment',
    props: {
        comment: {
            type: Object,
            required: true
        }
    }
};
</script>

<template>
    <div class="mb-4">
        <div class="p-2 mb-2 hover:bg-gray-100">
            <div class="text-sm text-gray-500">
                ▲ {{ comment.author }} • {{ $utils.formatTimeAgo(comment.created_at) }}
            </div>
            <div v-html="comment.text" class="pl-4"></div>
        </div>
        <div class="pl-4">
            <Comment v-for="child in comment.children" :key="child.id" :comment="child" />
        </div>
    </div>
</template>
