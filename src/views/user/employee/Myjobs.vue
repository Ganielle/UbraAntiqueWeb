<template>
    <div>
        <div
        class="text-black text-xl uppercase lg:inline-block font-semibold pt-12"
        style="display: flex; "
        >
        <p @click="() => $router.push('/employee/dashboard')" class="breadcrumbs">HOME</p> / MY JOBS
        </div>
    </div>

    <br/>

    
</template>

<script>
export default {
    name: "user-my-jobs-page",
}
</script>