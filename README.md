# wp-prime-front

~~~
GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519_github_second -o IdentitiesOnly=yes' git clone git@github.com:malikov-n/wp-prime-front.git .
~~~

~~~
nano ~/.ssh/config
~~~

~~~
Host github-second
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github_second
    IdentitiesOnly yes
~~~
