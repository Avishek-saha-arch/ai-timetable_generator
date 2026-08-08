from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()


def _normalize_supabase_url(url: str | None) -> str | None:
    if not url:
        return None

    normalized = url.strip()
    if not normalized:
        return None

    if normalized.endswith("/"):
        normalized = normalized[:-1]

    for suffix in ("/rest/v1", "/rest/v1/"):
        if normalized.endswith(suffix):
            normalized = normalized[:-len(suffix)]
            break

    return normalized


SUPABASE_URL = _normalize_supabase_url(os.getenv("SUPABASE_URL"))
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)