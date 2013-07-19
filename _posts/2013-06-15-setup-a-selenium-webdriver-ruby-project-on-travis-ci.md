---
layout: post
title: "在 Travis CI 上创建 Selenium WebDriver Ruby 项目"
description: "如何在 Travis CI 上创建一个使用 headless PhantomJS 浏览器的 Selenium WebDriver Ruby 自动化测试项目。"
category: articles
tags: [github, phantomjs, ruby, selenium, travis-ci, webdriver]
alias: [/2013/06/15/]
load_js_utils: true
---
{% include JB/setup %}

### <a id="create-repo"></a>Create a repository on Github

A Github repository is needed in order to build it on Travis CI.
If haven't done so, go to Github's ['Create a New Repository'](https://github.com/repositories/new) page and create a new public repository.

### <a id="create-project"></a>Create a Selenium WebDriver Ruby project

#### <a id="project-structure"></a>Project Structure
Here is how this sample Selenium Ruby project is structured:

	/root						-- root of the repository
		/test					-- folder contains the sample test
			test_home_page.rb	-- sample test file
		.travis.yml				-- configuration file for Travis CI
		README.md
		Rakefile				-- Rakefile

#### <a id="create-sample-test"></a>Create a sample UI test with headless PhantomJS
- `Test::Unit` framework is used as the testing framework in this example.
- Headless WebKit [PhantomJS](http://phantomjs.org/) will be the browser to run the UI tests.
- PhantomJS binary should be installed by default in [Travis CI servers](http://about.travis-ci.org/docs/user/ci-environment/),
which is `1.9.1` as of 05/07/2013.
- Travis CI supports tests which require GUI, see documentation
[here](http://about.travis-ci.org/docs/user/gui-and-headless-browsers).

Here is a sample test file called `test_home_page.rb`:
{% highlight ruby %}
require 'selenium-webdriver'
require 'test/unit'

module Test
  class TestHomePage < Test::Unit::TestCase

    def setup
      @driver = Selenium::WebDriver.for :phantomjs
      @driver.navigate.to('http://yizeng.me')
    end

    def teardown
      @driver.quit
    end

    def test_home_page_title
      assert_equal('Yi Zeng', @driver.title)
    end
  end
end
{% endhighlight %}

#### <a id="add-rakefile"></a>Add Rakefile
Travis CI uses `Rakefile` to build project and execute the tests, if the file is not present, build will fail like this:

	$ rake
	rake aborted!
	No Rakefile found (looking for: rakefile, Rakefile, rakefile.rb, Rakefile.rb)
	The command "rake" exited with 1.

Here is a sample Rakefile:
{% highlight ruby %}
require 'rake/testtask'

task :default => [:test]
Rake::TestTask.new(:test) do |test|
  test.libs << 'test'

  # ensure the sample test file is included here
  test.test_files = FileList['test/test_*.rb']

  test.verbose = true
end
{% endhighlight %}

#### <a id="add-travis-yml"></a>Add .travis.yml

Travis CI uses `.travis.yml` file in the root of the repository to learn about the project, which for instance includes:

- Programming language of the project
- Build setup and cleanup
- Commands to execute the build

The sample testing project here is written in Ruby, so Ruby configurations will be used in `.travis.yml`.
Detailed official documentation can be found [here](http://about.travis-ci.org/docs/user/languages/ruby/).
In order to validate it, [Travis Lint](http://about.travis-ci.org/docs/user/travis-lint/) would be a handy tool, while
the simplest way is just go to [Travis WebLint](http://lint.travis-ci.org/) and paste the content in.

{% highlight yaml %}
# Sample .travis.yml file:
language: ruby

rvm: # the Ruby versions to be used
  - 2.0.0
  - 1.9.3
  - 1.9.2

before_install:
  - gem update # optional, update all gems
  - gem install selenium-webdriver
  - phantomjs --version # output the phantomjs version
{% endhighlight %}

### <a id="push-to-github"></a>Push to Github
Once the repository is properly created, push it to Github.

### <a id="enable-hook"></a>Login to Travis CI and enable hook

1. Login to Travis CI with the Github account of this repository.
2. Visit [Travis CI profile](https://travis-ci.org/profile) and find the repository.
If the repository does not appear on the list, make sure
	- It is not a private repository
	- Travis CI has been synced with Github (click "Sync now" if necessary)
3. Enable the hook for this repository.

<a class="post-image" href="/assets/images/posts/2013-06-09-enable-hook-on-travis-ci.png" title="Enable hook on Travis CI">
  <img itemprop="image" src="/assets/images/posts/2013-06-09-enable-hook-on-travis-ci.png" alt="Enable hook on Travis CI" />
</a>

### <a id="run-project"></a>Run project on Travis CI

Travis CI should be able to build to the project automatically whenever new changesets are pushed to Github.

However, to kick off a test run manually:

1. Go to the repository settings page on Github
2. Select tab `Service Hooks` (url: https://github.com/[GITHUB_USERNAME]/[REPO_NAME]/settings/hooks)
3. Find `Travis` down to bottom
4. Click `Test Hook` button

### <a id="analyze-results"></a>Analyze results on Travis CI

#### <a id="results-page"></a>Project page on Travis CI
The project page on Travis CI is: `https://travis-ci.org/[GITHUB_USERNAME]/[REPO_NAME]`

<a class="post-image" href="/assets/images/posts/2013-06-15-results-page-on-travis-ci.png" title="Results page on Travis CI">
  <img itemprop="image" src="/assets/images/posts/2013-06-15-results-page-on-travis-ci.png" alt="Results page on Travis CI" />
</a>

#### <a id="build-log"></a>Build log
Clicking each job number will open up the build log for that particular jobs,
which basically contains all console output during the build.

#### <a id="test-results"></a>Test Results
The results are shown in the `rake` section in the build log.
For example, here are the test results inside [this particular job's build log](https://travis-ci.org/yizeng/setup-selenium-webdriver-ruby-project-on-travis-ci/jobs/8109067):

	$ rake
	/home/travis/.rvm/rubies/ruby-2.0.0-p0/bin/ruby -I"lib:test" -I"/home/travis/.rvm/gems/ruby-2.0.0-p0/gems/rake-10.0.4/lib" "/home/travis/.rvm/gems/ruby-2.0.0-p0/gems/rake-10.0.4/lib/rake/rake_test_loader.rb" "test/test_home_page.rb" 
	Run options:

	# Running tests:

	Finished tests in 1.078374s, 0.9273 tests/s, 0.9273 assertions/s.
	1 tests, 1 assertions, 0 failures, 0 errors, 0 skips

	ruby -v: ruby 2.0.0p0 (2013-02-24 revision 39474) [x86_64-linux]
	The command "rake" exited with 0.

#### <a id="build-status-images"></a>Build status images
Travis CI provides [build status images](http://about.travis-ci.org/docs/user/status-images/) for projects,
which are encouraged to be added to project sites, README files as good software development practices.

The status image can be found at `https://travis-ci.org/[GITHUB_USERNAME]/[REPO_NAME].png`,
with branches can be specified by URL query string like `?branch=master,staging,production`optionally.

Alternatively, in the repository page of Travis CI, click settings icon button, then select `Status Image`,
a dialog with all the options will be displayed, as shown in the screenshot below:

<a class="post-image" href="/assets/images/posts/2013-07-05-travis-ci-status-image-options.png" title="Travis CI status image options">
  <img itemprop="image" src="/assets/images/posts/2013-07-05-travis-ci-status-image-options.png" alt="Travis CI status image options" />
</a>

The sample project's status is currently: <a class="image-link" href="https://travis-ci.org/yizeng/setup-selenium-webdriver-ruby-project-on-travis-ci" title="Travis CI build status"><img src="https://travis-ci.org/yizeng/setup-selenium-webdriver-ruby-project-on-travis-ci.png" alt="Travis CI build status" /></a>
