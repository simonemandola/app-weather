<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "SupabaseCli",
  methods: {
    getSupabaseCli() {
      return createClient(
        process.env.VUE_APP_URL_API_SUPABASE,
        process.env.VUE_APP_KEY_PUBLIC_SUPABASE
      );
    },
  },
};
</script>
