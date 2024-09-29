#include <bits/stdc++.h>
using namespace std;
#define endl "\n"
#define int long long
const int mod=1e9+7;

void solve(){
  int n;
  cin>>n;
  vector<int>v(n);
  int last;
  int sm=0;
  for(int i=0;i<n;i++){
      cin>>v[i];
      if(v[i]==n) last=i;
      sm+=v[i];
  }
  int x,y;
  x=last-1,y=last+1;
  int cnt=1,ans=1;
  sm-=v[last];
  while(x>=0 && y<n && cnt!=n-1){
     if(v[x]>v[y]){
         sm-=v[x];
         x--;
         cnt++;
         int p=n-cnt;
         if(sm==p*(p+1)/2){
             ans=max(ans,cnt);
         }
     }else{
         sm-=v[y];
         y++;
         cnt++;
           int p=n-cnt;
         if(sm==p*(p+1)/2){
             ans=max(ans,cnt);
         }
     }
  }
  while(x>=0 && cnt!=n-1){
       sm-=v[x];
         x--;
         cnt++;
         int p=n-cnt;
         if(sm==p*(p+1)/2){
             ans=max(ans,cnt);
         }
  }
   while(y<n && cnt!=n-1){
       sm-=v[y];
         y++;
         cnt++;
           int p=n-cnt;
         if(sm==p*(p+1)/2){
             ans=max(ans,cnt);
         }
  }
  cout<<ans<<endl;
 
}
signed main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t=1;
    cin>>t;
    while(t--) solve();
    return 0;
}