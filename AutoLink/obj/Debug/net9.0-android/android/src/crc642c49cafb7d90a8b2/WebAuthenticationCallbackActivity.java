package crc642c49cafb7d90a8b2;


public class WebAuthenticationCallbackActivity
	extends crc6468b6408a11370c2f.WebAuthenticatorCallbackActivity
	implements
		mono.android.IGCUserPeer
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"";
		mono.android.Runtime.register ("AutoLink.WebAuthenticationCallbackActivity, AutoLink", WebAuthenticationCallbackActivity.class, __md_methods);
	}

	public WebAuthenticationCallbackActivity ()
	{
		super ();
		if (getClass () == WebAuthenticationCallbackActivity.class) {
			mono.android.TypeManager.Activate ("AutoLink.WebAuthenticationCallbackActivity, AutoLink", "", this, new java.lang.Object[] {  });
		}
	}

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
