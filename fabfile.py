from fabric import task


def set_node_version():
    return f"source ~/.nvm/nvm.sh && nvm use 15"

@task
def deploy(con, branch="main"):
    code_dir = "~/ProjConnectWeb"
    with con.cd(code_dir):
        print(f"Fetching branch {branch}...")
        con.run(f"git fetch origin {branch}")

        print(f"Switching to branch {branch}...")
        con.run(f"git switch {branch}")

        print("Hard reset branch...")
        con.run("git reset --hard @{{u}}")

        print("Installing node dependencies...")
        con.run(f"{set_node_version()} && DISABLE_ESLINT_PLUGIN=true yarn install --production")

        print("Building static files...")
        con.run(f"{set_node_version()} && DISABLE_ESLINT_PLUGIN=true yarn build")
