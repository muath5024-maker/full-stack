import os
from supabase import create_client, Client

def get_supabase() -> Client:
    """
    إنشاء وإرجاع عميل Supabase.
    يستخدم المتغيرات البيئية للاتصال.
    """
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    
    if not url or not key:
        raise ValueError("Supabase URL and Key must be set in environment variables.")

    supabase: Client = create_client(url, key)
    return supabase
