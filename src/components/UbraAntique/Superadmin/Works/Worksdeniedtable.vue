<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Works Denied List
          </h3>
        </div>
      </div>
    </div>
    <div v-if="loading">
        <div style="width: 100%; height: 200px; background-color: white; border-radius: 5px;">
            <ContentLoader viewBox="0 0 250 110">
                <rect x="2" y="5" rx="3" ry="3" width="50" height="5" />
                <rect x="2" y="12" rx="3" ry="3" width="100" height="5" />
                <rect x="2" y="20" rx="3" ry="3" width="100" height="5" />
            </ContentLoader>
        </div>
        <br/>
        <div style="width: 100%; height: 200px; background-color: white; border-radius: 5px;">
            <ContentLoader viewBox="0 0 250 110">
                <rect x="2" y="5" rx="3" ry="3" width="50" height="5" />
                <rect x="2" y="12" rx="3" ry="3" width="100" height="5" />
                <rect x="2" y="20" rx="3" ry="3" width="100" height="5" />
            </ContentLoader>
        </div>
    </div>
    <div v-else class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Work Name
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Posted by
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Description
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Posted Date
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Applicants
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Worker Status
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Deny Reason
            </th>
            <th
              class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in jobitems" :key="items._id">
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ items.title }}
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ items.ownerDetails.firstname + ' ' + items.ownerDetails.lastname }}
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ truncatedDescription(items.description) }}
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ formatDate(items.updatedAt) }}
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ items.applicantCount }}
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ items.status }}
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <button class="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" style="width: 130px;" type="button" @click="$emit('denyreason', items.denyreason)">
                View Reason
              </button>
            </td>
            <td
              class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <button class="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" style="width: 130px;" type="button" @click="$emit('details', items._id, items.title)">
                View Details
              </button>
              <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase px-3 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" style="width: 100px;" type="button" @click="$emit('repending', items._id, 'Pending')">
                Re-Pending
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import htmlTruncate from 'html-truncate';
import { ContentLoader } from 'vue-content-loader'
export default {
  data() {
    return {
    };
  },
  components: {
    ContentLoader,  
  },
  props: {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    jobitems: {
      type: Array,
      default: () => [], // Set an empty array as the default value
    },
    loading: {
      type: Boolean,
      default: () => true
    }
  },
  methods: {
    truncatedDescription(html) {
      return htmlTruncate(html, 50); // truncates to ~200 characters safely
    },
    formatDate(isoString) {
      const date = new Date(isoString)
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",   // August
        day: "numeric",  // 27
      })
    }
  }
};
</script>
